import { useEffect, useState, useMemo } from 'react';

import socketHelper from '@ailab/ui-toolkit/helpers/socketHelper';
import ailabApi from '@ailab/api-client/ailabApi';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  initialMessagesState,
} from '@ailab/ui-toolkit/api-slices/aiChat';

import appConfig from '../../config';
import * as S from "./styled";

function IndexPage() {

  const [newMessage, setNewMessage] = useState("");
  const { data: { ids, entities } = initialMessagesState } = useGetMessagesQuery();
  const [sendMessage] = useSendMessageMutation();
 
  const messages = useMemo(() => {
    return ids.map((id) => entities[id]);
  }, [ids, entities]);

  useEffect(() => {
    const jwt = ailabApi.getJWT();
    socketHelper.connect({
      JWT: jwt,
      socketUrl: appConfig.socketUrl,
    });
  }, []);

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    sendMessage({ body: { message: newMessage } });
    setNewMessage("");
  }

  const handleInputChange = (ev) => {
    setNewMessage(ev.target.value);
  }

  return (
    <S.IndexPage>
      <S.ChatMessages>
        <S.ChatMessage>
          {messages.map((message) => (
            <S.ChatMessageText key={message.id}>{message.text}</S.ChatMessageText>
          ))}
        </S.ChatMessage>
      </S.ChatMessages>
      <S.InputContainer>
        <S.InputForm onSubmit={handleFormSubmit}>
          <S.ChatInput value={newMessage} onChange={handleInputChange} />
        </S.InputForm>
      </S.InputContainer>
    </S.IndexPage>
  );
}
export default IndexPage;
