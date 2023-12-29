# Apollo Hooks로 GraphQL 데이터 통신하기

---

Apollo Client는 React Hooks과 같이 GraphQL을 호출할 수 있도록 useQuery, useMutation와 같은 Apollo Hooks 을 제공하며 `gql`이라는 template literal tag를 사용해 자바스크립트를 GraphQL 구문으로 바꿔줍니다.

Apollo Client에는 세 가지 Operation Type이 있습니다.

- `Query`: 데이터 조회(Read)
- `Muation`: 데이터 변경(Create, Update, Delete)
- `Subscription`: 데이터 실시간 구독 -> 이 애플리케이션에서는 제외되어 있습니다.

> Countries GraphQL API라는 Public API를 이용하여 GraphQL 서버를 따로 만들지 않고, 테스트 하였습니다.
>
> - GitHub: https://github.com/trevorblades/countries
> - API URL(Playground): https://countries.trevorblades.com/

## Operation Type #1: Query

### useQuery

GraphQL 데이터를 fetch하여 UI에 결과를 반영할 수 있게 도와주는 hooks입니다. 또한, error를 추적하고 loading 상태를 수동으로 확인하여 추가적인 로딩 관리 코드를 다룰 수 있도록 도와줍니다.

```jsx
import { useQuery } from '@apollo/client';
import { GET_COUNTRY_QUERY } from '../graphql';

function UseQuery() {
  const { loading, error, data } = useQuery(GET_COUNTRY_QUERY, {
    variables: { code: 'KR' },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const country = data.country;

  return (
    <div>
      <h1>{country.name} Information</h1>
      <ul>
        <li>Country name: {country.name}</li>
        <li>Native: {country.native}</li>
        <li>Capital: {country.capital}</li>
        <li>National flag: {country.emoji}</li>
        <li>Currency: {country.currency}</li>
        <li>Languages code: {country.languages[0].code}</li>
        <li>Languages name: {country.languages[0].name}</li>
      </ul>
    </div>
  );
}

export default UseQuery;
```

![](https://velog.velcdn.com/images/jiyaho/post/c36aeada-3a23-41f9-acbc-2e341761013f/image.png)

위와 같이 데이터를 가져와 화면에 출력된 것을 확인할 수 있습니다. 또한, useQuery에는 쿼리(데이터)를 최신 상태로 유지하기 위한 방법이 2가지가 있습니다. 바로 Polling과 Refetching을 통해서 가능합니다.

**1. Polling (주기적인 데이터 업데이트)**
Polling은 지정된 간격으로 Query를 주기적으로 다시 실행함으로써 데이터를 업데이트하여 서버와 동기화를 제공합니다. 실시간 혹은 주기적으로 데이터를 가져와야 하는 경우에 유용합니다.
쿼리에 대한 폴링을 활성화하려면 pollInterval 옵션을 밀리초 단위의 간격으로 useQuery hook에 전달합니다.

```jsx
const { data } = useSuspenseQuery(GET_COUNTRY_QUERY, {
  variables: { code },
  pollInterval: 5000, // 5초마다 Query를 실행하여 데이터 업데이트
});
```

**2. Refetching (수동으로 데이터 업데이트):**
Refetching은 특정 이벤트 또는 사용자 상호 작용(특정 버튼을 클릭하는 등의 상호 작용)에 따라 최신의 데이터로 업데이트하려는 경우에 사용할 수 있습니다.
refetch 함수에 새로운 변수 객체를 전달할 수 있고, 변수를 전달하지 않으면 이전에 사용한 Query를 최신의 데이터로 가져와 업데이트합니다.

![](https://velog.velcdn.com/images/jiyaho/post/108df7a5-41e9-4b73-a9de-d3ecf71feee0/image.gif)

```jsx
import { useQuery } from '@apollo/client';
import { GET_COUNTRY_QUERY } from '../graphql';

function UseQuery() {
  const { loading, error, data, refetch } = useQuery(GET_COUNTRY_QUERY, {
    variables: { code: 'KR' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data.country;

  return (
    <div>
      <h1>{country.name} Information</h1>
      <ul>
        <li>Native: {country.native}</li>
        <li>Capital: {country.capital}</li>
        <li>National flag: {country.emoji}</li>
        <li>Currency: {country.currency}</li>
        <li>Languages code: {country.languages[0].code}</li>
        <li>Languages name: {country.languages[0].name}</li>
      </ul>
      <button onClick={() => refetch({ code: 'US' })}>Refetch with USA Code</button>
      <button onClick={() => refetch({ code: 'KR' })}>Refetch with Korea Code</button>
      <button onClick={() => refetch()}>Refetch without Changing Country Code</button>
    </div>
  );
}

export default UseQuery;
```

### useLazyQuery

useLazyQuery는 GraphQL 쿼리를 수동으로 실행하고 싶을 때 사용됩니다. 컴포넌트가 마운트될 때 자동으로 실행되는 useQuery와 달리, useLazyQuery는 나중에 사용자 조작(버튼 클릭 등)과 같은 이벤트에 응답하여 쿼리를 원하는 시점에 실행하고 싶을 때 유용합니다.

![](https://velog.velcdn.com/images/jiyaho/post/c35d0147-0370-4333-aca0-6ba5e844aed8/image.gif)

```jsx
import { useLazyQuery } from '@apollo/client';
import { GET_COUNTRY_QUERY } from '../graphql';

function UseLazyQuery() {
  const [fetchCountryData, { loading, data, error }] = useLazyQuery(GET_COUNTRY_QUERY);

  const handleButtonClick = () => {
    // 쿼리를 수동으로 실행
    fetchCountryData({ variables: { code: 'KR' } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data?.country;

  return (
    <div style={{ marginTop: '30px' }}>
      <button onClick={handleButtonClick}>Fetch Country Data</button>
      {data && (
        <>
          <h1>{country.name} Information</h1>
          <ul>
            <li>Native: {country.native}</li>
            <li>Capital: {country.capital}</li>
            <li>National flag: {country.emoji}</li>
            <li>Currency: {country.currency}</li>
            <li>Languages code: {country.languages[0].code}</li>
            <li>Languages name: {country.languages[0].name}</li>
          </ul>
        </>
      )}
    </div>
  );
}
export default UseLazyQuery;
```

### useSuspenseQuery

Apollo Client에서 useSuspenseQuery를 이용하여 React 18에 도입된 Suspense 기능을 활용한 데이터 가져오기가 가능합니다.
React의 Suspense란, 동시 렌더링 엔진을 사용하여 자식(children) 요소들이 로딩을 마칠 때까지 fallback을 표시할 수 있는 기능입니다.

```jsx
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

위 코드와 같이 fallback에는 UI 로딩이 끝날 때까지 보여줄 로딩관련 컴포넌트(스피너 등)를 전달합니다.
아래 코드는 React Suspense와 Apollo Client의 useSuspenseQuery를 사용하여 구현한 예시 코드입니다. 로딩 중에 자동으로 Suspense를 활성화하고 로딩 상태를 처리합니다.

```jsx
import { Suspense } from 'react';
import { useSuspenseQuery } from '@apollo/client';
import { GET_COUNTRY_QUERY } from '../graphql';

function SuspenseComponent({ code }) {
  const { data } = useSuspenseQuery(GET_COUNTRY_QUERY, {
    variables: { code },
  });
  return <p>Country name: {data.country.name}</p>;
}

function UseSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuspenseComponent code="KR" />
    </Suspense>
  );
}

export default UseSuspense;
```

## Operation Type #2: Mutation

### useMutation

useMutation은 GraphQL 서버에 데이터의 업데이트를 전송하기 위한 Hook입니다.
Mutation을 사용하기 위해서는 먼저 서버 단에서 Schema와 Resolver 작성이 필요합니다. (참고로 Apollo는 GraphQL 서버 라이브러리로 Apollo Server를 제공합니다.)

```jsx
const [convertToUppercase, { loading, error, data }] = useMutation(CONVERT_TO_UPPERCASE_MUTATION);
```

- `convertToUppercase`: 뮤테이션을 수행하는 함수로 호출 시 뮤테이션이 서버로 전송되고 실행됩니다.
- `{ data }`: 뮤테이션의 실행 결과로부터 얻은 데이터입니다. 뮤테이션이 성공적으로 실행되면 data 객체에 결과 데이터가 저장됩니다.

아래는 useMutation 예시 코드입니다. loading, error, data를 통해 뮤테이션의 실행 상태와 결과를 처리하며, 버튼 클릭 시 비동기적으로 뮤테이션을 실행하는 예시입니다.

```jsx
import { gql, useMutation } from '@apollo/client';

// GraphQL Mutation 정의
const CONVERT_TO_UPPERCASE_MUTATION = gql`
  mutation ConvertToUppercase($countryCode: ID!) {
    convertToUppercase(countryCode: $countryCode) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

function UseMutation() {
  const [convertToUppercase, { loading, error, data }] = useMutation(CONVERT_TO_UPPERCASE_MUTATION);

  // Mutation 실행 함수
  const handleConvertToUppercase = async () => {
    try {
      // country 코드를 원하는 값으로 설정
      const countryCode = 'KR';

      // useMutation 훅을 통해 Mutation 실행
      await convertToUppercase({
        variables: { countryCode },
      });

      // Mutation 실행 후의 로직
      // 예: 성공 메시지 표시 또는 필요한 업데이트 수행
      console.log('Mutation 실행 완료:', data);
    } catch (error) {
      // Mutation 실행 중 에러 처리
      console.error('Mutation 에러:', error.message);
    }
  };

  return (
    <div>
      <h1>useMutation Components</h1>
      <button onClick={handleConvertToUppercase} disabled={loading}>
        {loading ? 'Converting...' : 'Convert Languages to Uppercase'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default UseMutation;
```
