import { useAuthContext } from "@context/AuthContextProvider";
import { useGetContactsQuery as ugcq } from "@redux/features/messages/messagesSlice";

export const useGetContactsQuery = () => {
  const { user } = useAuthContext()

  return ugcq({
    apiTokenInstance: user?.apiTokenInstance ?? '',
    idInstance: user?.idInstance ?? ''
  })
}