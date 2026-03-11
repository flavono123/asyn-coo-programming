"use client";

import { createContext, useContext } from "react";

export type Locale = "ko" | "en";

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
}>({ locale: "ko", setLocale: () => {} });

export function useLocale() {
  return useContext(LocaleContext);
}

const dict = {
  ko: {
    header_byline_prefix: "",
    header_byline_name: "flavono123",
    header_byline_suffix: "이 제시하는",
    title: "비둘기 프로그래밍",
    subtitle: "Asyn-Coo Programming",
    quote: "나는 비둘기 ... 기둘 기둘",
    definition_title: "정의",
    definition: `비둘기 프로그래밍(asyn-coo programming)은 AI에게 코드 작성을 요청한 후, 결과를 기다리며 점진적으로 코딩 능력을 상실해가는 현대적 소프트웨어 개발 패러다임이다.`,
    principles_title: "핵심 원칙",
    principle1_title: "1. 요청 후 망각 (Request & Forget)",
    principle1:
      "프롬프트를 입력한 후 무엇을 요청했는지 즉시 잊는다. 이것은 버그가 아니라 피쳐다.",
    principle2_title: "2. 비동기 구구 (Asyn-Coo)",
    principle2:
      "AI가 코드를 생성하는 동안 트위터 → 유튜브 → 냉장고 순으로 순회한다. 이 순회의 시간복잡도는 O(∞)이다.",
    principle3_title: "3. 점진적 무능화 (Progressive Deskilling)",
    principle3: `for 루프의 문법이 가물가물해지기 시작하면 성공적으로 비둘기 프로그래밍에 진입한 것이다. 축하한다.`,
    principle4_title: "4. 실업 대기 (A-wait Unemployment)",
    principle4_pre: `async function whenWillIBeReplaced()`,
    principle4_post: ` — 아직 resolve 되지 않았다. pending 중이다. 기둘.`,
    lifecycle_title: "생명주기",
    lifecycle: `요청 → 기둘... → 주의 분산 → 기둘... → 결과 확인 → 이해 불가 → 다시 요청 → 기둘...`,
    faq_title: "FAQ",
    faq1_q: "Q: 비둘기 프로그래밍은 바이브 코딩과 어떻게 다릅니까?",
    faq1_a:
      "A: 바이브 코딩은 분위기에 취해 코딩합니다. 비둘기 프로그래밍은 분위기에 취해 기다립니다.",
    faq2_q: "Q: 자격 요건이 있나요?",
    faq2_a:
      "A: Claude Code를 설치하면 됩니다.",
    faq3_q: "Q: 생산성이 향상됩니까?",
    faq3_a: "A: 네, AI의 생산성은 확실히 향상됩니다. 당신의 것은 모르겠습니다.",
    faq4_q: "Q: 비둘기는 왜 비둘기입니까?",
    faq4_a:
      'A: 나는 비둘기 ... 기둘 기둘',
    version: "v0.1.0-coo",
    version_label: "문서 버전",
    comments_title: "댓글",
    comment_placeholder: "구...?",
    nickname_placeholder: "익명의 기둘기",
    submit: "작성",
    reply: "답글",
    like: "모이",
    cancel: "취소",
    loading: "기둘...",
    no_comments: "아직 아무 비둘기도 울지 않았습니다.",
    footer: "이 문서는 AI가 생성하는 동안 작성자는 냉장고를 열고 있었습니다.",
  },
  en: {
    header_byline_prefix: "coined by ",
    header_byline_name: "flavono123",
    header_byline_suffix: "",
    title: "Asyn-Coo Programming",
    subtitle: "The A-Wait-Pigeon Development Paradigm",
    quote: "I am a-wait-pigeon ... asyn-coo asyn-coo",
    definition_title: "Definition",
    definition: `Asyn-coo Programming is a modern software development paradigm in which one delegates code authorship to AI, then progressively loses the ability to code while waiting for the results.`,
    principles_title: "Core Principles",
    principle1_title: "1. Request & Forget",
    principle1:
      "After typing a prompt, immediately forget what you asked for. This is not a bug. It's a feature.",
    principle2_title: "2. Asyn-Coo",
    principle2:
      "While AI generates code, traverse: Twitter → YouTube → Fridge. The time complexity of this traversal is O(∞).",
    principle3_title: "3. Progressive Deskilling",
    principle3:
      "When you start forgetting for-loop syntax, you have successfully entered asyn-coo programming. Congratulations.",
    principle4_title: "4. A-wait Unemployment",
    principle4_pre: `async function whenWillIBeReplaced()`,
    principle4_post: ` — still pending. Not yet resolved. Coo.`,
    lifecycle_title: "Lifecycle",
    lifecycle:
      "Request → coo... → distracted → coo... → check result → cannot understand → re-request → coo...",
    faq_title: "FAQ",
    faq1_q:
      "Q: How is asyn-coo programming different from vibe coding?",
    faq1_a:
      "A: Vibe coding: you code to the vibes. Asyn-coo programming: you wait to the vibes.",
    faq2_q: "Q: Are there any prerequisites?",
    faq2_a:
      "A: Just install Claude Code.",
    faq3_q: "Q: Does it improve productivity?",
    faq3_a:
      "A: Yes, the AI's productivity definitely improves. Yours? Unclear.",
    faq4_q: "Q: Why a pigeon?",
    faq4_a:
      'A: I am a-wait-pigeon ... asyn-coo asyn-coo',
    version: "v0.1.0-coo",
    version_label: "Document Version",
    comments_title: "Comments",
    comment_placeholder: "coo...?",
    nickname_placeholder: "a-wait-pigeon",
    submit: "Post",
    reply: "Reply",
    like: "Seed",
    cancel: "Cancel",
    loading: "coo...",
    no_comments: "No pigeon has cooed yet.",
    footer:
      "The author was opening the fridge while AI generated this document.",
  },
} as const;

export type TranslationKey = keyof (typeof dict)["ko"];

export function t(locale: Locale, key: TranslationKey): string {
  return dict[locale][key];
}
