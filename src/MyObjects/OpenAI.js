import OpenAI from "openai";

const openai = new OpenAI({ apiKey: 'sk-proj-********', dangerouslyAllowBrowser: true });

async function Completion(context, prompt) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: context },
      { role: "user", content: prompt }
    ],
    model: "gpt-4-turbo-preview",
  });
  return completion.choices[0].message.content;
}

export default Completion;
