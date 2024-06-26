import React from 'react';

import Button from '../Button';
import * as S from './styled';

const FallBack = () => (
  <S.Error>
    <S.Alert>
      <S.Header>Something wrong!</S.Header>
      <S.Message>
        <span>
          We already got a report with the error and soon we will fix it.
        </span>
        <Button
          appearance="link"
          spacing="none"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Clear local storage. It may help!
        </Button>
      </S.Message>
    </S.Alert>
  </S.Error>
);

export default FallBack;
