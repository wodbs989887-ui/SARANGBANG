import React, { useMemo, useState } from "react";

const MEMBERS = {
  최휘종: { emoji: "🔥", desc: "청소, 책임감, 아침형 에너지가 강한 유형!" },
  이동준: { emoji: "🐯", desc: "정리와 원칙을 중요하게 여기는 기강 담당 유형!" },
  안진용: { emoji: "⚾", desc: "눕기와 여유를 사랑하는 둥글둥글한 유형!" },
  박수민: { emoji: "💻", desc: "피곤해도 묵묵히 할 일을 끝내는 성실형!" },
  제주안: { emoji: "🍵", desc: "관심 분야가 나오면 깊게 파고드는 탐구형!" },
  최재윤: { emoji: "🎹", desc: "분위기를 살리는 감성 드립형!" },
  임새해: { emoji: "🏋️", desc: "피곤해도 조용히 버티는 대학원생 감성 유형!" },
  박임재: { emoji: "🍜", desc: "냉장고만 봐도 메뉴가 떠오르는 요리형!" },
  장의영: { emoji: "⚽", desc: "릴스, 밈, 드립을 사랑하는 막내미 유형!" },
};

const ANSWER_OPTIONS = [
  { label: "매우 그렇다", multiplier: 1 },
  { label: "그렇다", multiplier: 0.5 },
  { label: "보통이다", multiplier: 0 },
  { label: "그렇지 않다", multiplier: -0.5 },
  { label: "매우 그렇지 않다", multiplier: -1 },
];

const QUESTIONS = [
  { text: "누가 맡은 일을 대충 하면 결국 내가 다시 하게 될 것 같다.", scores: { 이동준: 10, 최휘종: 7, 안진용: -6 } },
  { text: "일단 눕고 나서 생각하는 편이다.", scores: { 안진용: 9, 최휘종: -7, 이동준: -5 } },
  { text: "청소가 제대로 안 되어 있으면 신경 쓰인다.", scores: { 이동준: 10, 최휘종: 7, 장의영: -5 } },
  { text: "설명하다 보면 혼자 너무 깊게 들어간다.", scores: { 제주안: 9, 이동준: -4 } },
  { text: "아침에 누가 깨우지 않으면 계속 잘 자신 있다.", scores: { 안진용: 9, 장의영: 3, 최휘종: -6 } },
  { text: "사람 웃기려고 일부러 독특한 행동을 한 적이 많다.", scores: { 최재윤: 10, 이동준: -5, 박수민: -3 } },
  { text: "분위기가 너무 조용하면 괜히 한마디 하고 싶어진다.", scores: { 최재윤: 9, 장의영: 5, 박수민: -4 } },
  { text: "릴스 보다가 늦게 잔 적이 많다.", scores: { 장의영: 10, 안진용: 4, 최휘종: -5 } },
  { text: "모르는 밈이 거의 없다.", scores: { 장의영: 9, 최재윤: 6, 이동준: -4 } },
  { text: "피곤해도 자기 할 일은 결국 끝내고 잔다.", scores: { 박수민: 10, 임새해: 7, 안진용: -7 } },
  { text: "밤 늦게까지 과제나 일을 붙잡고 있는 날이 많다.", scores: { 박수민: 9, 임새해: 8, 안진용: -5 } },
  { text: "갑자기 아무도 안 궁금한 TMI를 진지하게 말한 적 있다.", scores: { 제주안: 9, 최재윤: 2, 이동준: -4 } },
  { text: "냉장고 재료를 보면 요리 가능 여부부터 생각한다.", scores: { 박임재: 10, 장의영: -4 } },
  { text: "배달보다 직접 해먹는 게 더 좋다.", scores: { 박임재: 9, 장의영: -5, 안진용: -3 } },
  { text: "아침이 되면 알람 없이도 눈이 떠지는 편이다.", scores: { 최휘종: 10, 이동준: 5, 안진용: -8, 박임재: -5 } },
  { text: "자기 전까지 휴대폰 붙잡고 있는 날이 많다.", scores: { 박임재: 8, 장의영: 7, 박수민: -5, 최휘종: -4 } },
  { text: "즐겨라 고통을 경험하라 인내를 같은 말에 공감된다.", scores: { 최휘종: 10, 박수민: 8, 장의영: -5 } },
  { text: "오늘 할 일은 결국 끝까지 하게 된다.", scores: { 박수민: 9, 최휘종: 6, 안진용: -7 } },
  { text: "진지한 상황이어도 웃긴 생각이 먼저 떠오를 때가 있다.", scores: { 최재윤: 8, 장의영: 5, 박수민: -4 } },
  { text: "사람들이 안 궁금해해도 혼자 계속 찾아보는 분야가 있다.", scores: { 제주안: 10, 박수민: -3 } },
  { text: "7시에 아침 먹고 BM 전까지 다시 누워있을 것 같다.", scores: { 안진용: 10, 최휘종: -8, 이동준: -5 } },
  { text: "아침당번이면 알람 여러 개 맞춰놓고도 마지막에 일어날 것 같다.", scores: { 안진용: 9, 최휘종: -7 } },
  { text: "사랑방 바닥에 머리카락 보이면 그냥 못 지나친다.", scores: { 이동준: 10, 최휘종: 7, 장의영: -5 } },
  { text: "누가 이상한 드립 치면 더 세게 받아칠 자신 있다.", scores: { 최재윤: 9, 장의영: 5, 이동준: -3 } },
  { text: "대학원에 진학하고도 사랑방에 계속 살 것 같다.", scores: { 임새해: 999 } },
];

function createInitialScores() {
  const scores = {};
  Object.keys(MEMBERS).forEach((name) => {
    scores[name] = 0;
  });
  return scores;
}

function applyQuestionScores(currentScores, scoreMap, multiplier) {
  const updated = { ...currentScores };
  Object.entries(scoreMap).forEach(([member, score]) => {
    updated[member] = (updated[member] || 0) + score * multiplier;
  });
  return updated;
}

function calculateResults(scores) {
  const entries = Object.entries(scores);
  const positiveTotal = entries.reduce((sum, [, score]) => sum + Math.max(0, score), 0);
  return entries
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => ({
      name,
      score,
      percent: positiveTotal === 0 ? 0 : Math.round((Math.max(0, score) / positiveTotal) * 100),
    }));
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState(createInitialScores);

  const results = useMemo(() => calculateResults(scores), [scores]);
  const topResult = results[0];
  const progress = Math.round(((questionIndex + 1) / QUESTIONS.length) * 100);

  const handleAnswer = (multiplier) => {
    const question = QUESTIONS[questionIndex];
    setScores((prev) => applyQuestionScores(prev, question.scores, multiplier));
    if (questionIndex >= QUESTIONS.length - 1) setFinished(true);
    else setQuestionIndex((prev) => prev + 1);
  };

  const resetTest = () => {
    setStarted(false);
    setFinished(false);
    setQuestionIndex(0);
    setScores(createInitialScores());
  };

  return (
    <main className="page">
      <section className="card">
        {!started ? (
          <div className="centerStack">
            <h1 className="title">🏠 사랑방 성격유형 테스트</h1>
            <p className="subtitle">5점 척도로 답하고<br />당신과 가장 닮은 사랑방원을 찾아보세요!</p>
            <button className="primaryButton" type="button" onClick={() => setStarted(true)}>테스트 시작하기</button>
          </div>
        ) : finished ? (
          <div className="resultWrap">
            {topResult && (
              <div className="centerStack">
                <div className="resultEmoji">{MEMBERS[topResult.name].emoji}</div>
                <h2 className="resultLabel">당신의 사랑방원 유형은</h2>
                <h1 className="resultName">{topResult.name}형</h1>
                <p className="resultDesc">{MEMBERS[topResult.name].desc}</p>
              </div>
            )}
            <div className="ratioBox">
              <h3 className="ratioTitle">📊 유형 비율</h3>
              {results.map((result) => (
                <div key={result.name} className="ratioItem">
                  <div className="ratioHeader"><span>{MEMBERS[result.name].emoji} {result.name}</span><span>{result.percent}%</span></div>
                  <div className="barBg"><div className="barFill" style={{ width: `${Math.max(0, result.percent)}%` }} /></div>
                </div>
              ))}
            </div>
            <button className="primaryButton full" type="button" onClick={resetTest}>다시 테스트하기</button>
          </div>
        ) : (
          <div className="questionWrap">
            <div>
              <div className="progressHeader"><span>질문 {questionIndex + 1} / {QUESTIONS.length}</span><span>{progress}%</span></div>
              <div className="progressBg"><div className="progressFill" style={{ width: `${progress}%` }} /></div>
            </div>
            <div className="questionBox"><h2 className="questionText">{QUESTIONS[questionIndex].text}</h2></div>
            <div className="answerGrid">
              {ANSWER_OPTIONS.map((option) => (
                <button key={option.label} className="answerButton" type="button" onClick={() => handleAnswer(option.multiplier)}>{option.label}</button>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
