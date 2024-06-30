import styled from "@emotion/styled";

export const IndexPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--background-surface);
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ChatMessageText = styled.div`
  background-color: var(--background-surface);
  border-radius: 8px;
  padding: 10px;
`;

export const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid var(--border);
`;

export const InputForm = styled.form`
  display: flex;
`;

export const ChatInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px;
`;

