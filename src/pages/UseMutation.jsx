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
