# 목표 별 까지 터지지 않고 도달할 확률은?

https://darkpppet.github.io/is-destroy/

markov-chain을 사용하여 계산합니다.

---

## ver 0.0.2

코드 리팩토링
 * 행렬들의 자료구조를 변경하였습니다.
    - 2차원 배열을 사용한 밀집행렬 표현에서 Map을 사용한 희소행렬 표현으로 변경
    - 이로 인해 성능이 소폭 하락했습니다.
 * 이제 20성 이상 시작의 경우, 20성 밑의 상태를 고려하지 않습니다

---

## ver 0.0.1

이제 찬스타임을 고려합니다.
 * 2번 연속 하락 가능한 상태들에 대해, 1번 하락, 2번 하락 상태를 추가

버그 수정
 * 목표 별이 16성 이하고, 16>17 파괴방지 적용 후 계산 시 계산하지 못하는 오류 수정

기타 수정사항
 * 시작 별과 목표 별에 제대로 입력을 하지 않을 시, 그래프를 제거합니다
 * 모바일 반응 추가

---

## 추가 예정
 * 현재 없음
