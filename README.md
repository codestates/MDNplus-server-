# MDN+/Server 에 오신것을 환영합니다 😄

### 저희는 이렇게 개발하고 있습니다.

![스택 디자인 (1)](https://user-images.githubusercontent.com/76520075/118232974-46dabb00-b4cc-11eb-8d45-0949c7e06667.jpg)

### 🙋 MDN+ 프로젝트에서 MongoDB를 사용하는 이유 🙋

1. 클라이언트 쪽의 완성도와 요구 사항 변화에 따라서, 서버 쪽 역시 해당 데이터를 보내주기 위해서, 코드를 수정해야 합니다. 
- 이때, MySQL의 경우, table을 수정하거나 column을 늘리고, JOIN을 사용해서 복잡한 쿼리를 매번 사용해야 될 때도 있습니다. 
저희 벡엔드 개발자들은 프런트 엔드 개발자들의 변화되는 요구에 유연하게 대처하기 위해서, MongoDB를 사용했습니다.

2. MDN+는 같은 페이지를 두고, 유저들 사이에서 엄청난 양의 수정이 일어날 것입니다. 
- 다시 말해서, 관계형 데이터의 경우, 클라이언트 쪽에서 request가 많아질 수록 과부하가 걸립니다. 
반면에, NoSQL인 MongoDB는 이미 가공된 자료가 통째로 저장 되있습니다. 즉, DB에서 읽을 때, 굉장히 빠르며, 반복적인 연산이 RD(관계형 데이터)보다 훨씬 수월합니다.
- 관계형 데이터는 이 문제를 해결하기 위해서, 쿼리문의 결과값을 통째로 저장하는 방법이 있습니다. => 캐시에 저장한다고 해서 이것을 "서버 사이드 캐시"라고 부릅니다.
이렇게 한다면, DB의 호출 없이 결과값을 빠르게 호출할 수 있죠. 그런데, 결과값이 빈번하게 수정된다면 어떻게 해야될까요?? 매번 캐시에 저장된 결과값을 초기화해줘야 될텐데... 
이것은 무척이나 번거로운 일이 될 것입니다.

이러한 이유들로, 저희 BO3팀은 사용자들간의 빈번한 데이터 수정과 소통이 일어나는 MDN+에는 RDS인 MySQL보다는 NoSQL인 MongoDB가 더 적합하다고 판단했습니다.
<br></br>

### => 저희 프로젝트에 관해 자세하게 알고 싶으시다면, 클라이언트 Wiki를 방문해주세요 😘

[MDN+ 클라이언트 Wiki 바로가기](https://github.com/codestates/MDNplus-client-/wiki)
