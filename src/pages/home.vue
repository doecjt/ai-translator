<script setup lang="ts">
const apiKey = 'sess-tcSbs0PZTspWqScJfWlClWGX0ZXEcCnSEte3iTj2'
const authorization = `Bearer ${apiKey}`

const GTP_3_5_TURBO = 'gpt-3.5-turbo'

const model = ref(GTP_3_5_TURBO)

const content = ref('')
const answer = ref('')
const URL = 'https://api.openai.com/v1/chat/completions'
async function askQuestion() {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorization,
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: 'you are Cambridge Dictionary\nwhen I give you a word\n1. translate to Chinese\n2. phonetic symbol of the word in English\n3. an example that contains the word in English\n4. dictionary entries for the word',
        },
        {
          role: 'user',
          content: content.value,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: model.value,
      stream: false,
    }),
  })
  if (res.ok) {
    const data = await res.json()
    answer.value = data.choices[0].message.content
  }
}
</script>

<template>
  <div class="my-5">
    <div class="space-y-5">
      <h3 class="text-3xl text-slate-700 font-semibold text-center">
        Welcome to vue-starter!
      </h3>
      <form class="space-x-[10px]">
        <input v-model="content" type="text" class="border-2 border-slate-600 rounded-md">
        <button @click="askQuestion">
          Ask
        </button>
      </form>
      <div>{{ answer }}</div>

      <div class="flex justify-center">
        <i-mdi-github />
      </div>
    </div>
  </div>
</template>
