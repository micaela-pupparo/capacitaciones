import { useOptimistic, useRef } from "react";

export interface Message {
  text: string;
  sending?: boolean;
  key?: number;
}

interface Props {
  messages: Message[];
  sendMessage: (formData: FormData) => void;
}

function Thread({ messages, sendMessage }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  async function formAction(formData: FormData) {
    addOptimisticMessage(formData.get("message")?.toString());
    formRef.current?.reset();
    await sendMessage(formData);
  }

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentState, newMessage: string | undefined) => {
      if (!newMessage) return currentState;

      return [
        ...currentState,
        {
          text: newMessage,
          sending: true,
        } as Message,
      ];
    }
  );

  return (
    <>
      {optimisticMessages.map((message: Message, index: number) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default Thread;
