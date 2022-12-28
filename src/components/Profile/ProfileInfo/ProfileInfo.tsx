import {MapStatePropsType} from "../ProfileContainer";
import Preloader from "../../Preloader/Preloader";
import { ProfileStatus } from "../../Profile/ProfileStatus";

type ProfileInfoType = {
  profile: null | any
  status: string
  updateUserStatus: (status: string) => void
  // state: ProfilePageType
  // dispatch: (action: ActionType) => void
  // store: any
}

export const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }
  return (
    <>
      <img src={props.profile.photos.large}/>
      <ProfileStatus
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
    </>
  );
}