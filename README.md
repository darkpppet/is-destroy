# 목표 별 까지 터지지 않고 도달할 확률은?

https://darkpppet.github.io/is-destroy/


## ver 0.1.0

- [KMS 1.2.401 스타포스 패치](https://maplestory.nexon.com/news/update/767)를 반영했습니다.
- 하락하지 않으므로, markov-chain이 아닌 단순 계산으로 구합니다.
- 코드 리팩토링
  - 행렬 및 markov-chain 관련 부분을 모두 삭제했습니다
  - 확률 table을 Map이 아닌 배열로 변경하였습니다
  - 계산 방식 및 로직을 변경하였습니다.

### 연산 식 참고
어떤 상태에서 다음 상태로 전이하는 방법은 확률에 따라 $s, f, d$로 세 가지 알파벳 존재.

이 때, 어떤 별에서 다음 별로 파괴되지 않고 도달할 수 있는 표현식은 $f^{*}s$임.

이 표현식이 표현될 확률을 구해보면,

$\sum\limits_{i=0}^{\infty} f^i s = s \cdot {\cfrac{1 \cdot (1-f^{\infty})}{1-f}}=\cfrac{s}{1-f} $

따라서 총 확률은 $\prod\limits_{i=start}^{end-1} \cfrac{s_i}{1-f_i}$

---

KMS 1.2.401 패치 이전 버전 README는 [여기](https://github.com/darkpppet/is-destroy/blob/main/old/README.md)서 확인할 수 있습니다.
