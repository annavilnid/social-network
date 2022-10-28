import {MapStatePropsType} from "../ProfileContainer";
import Preloader from "../../Preloader/Preloader";

type ProfileInfoType = {
  profile: any
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
    </>
  );
}