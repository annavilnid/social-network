import style from './Users.module.css.module.css'
import {DialogsPageType, UsersPageType} from "../../redux/store";
import axios from "axios";
import s from "./UsersContainer.module.css";
import {toggleFollowingProgress, unfollow, follow, UserType} from "../../redux/users-reduser";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

type UsersComponentPropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  users: UserType[]
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  onPageChange: (pageNumber: number) => void
  followingInProgress: any
  //toggleFollowingProgress: (isLoading: boolean, userId: number) => void
}

export const Users = (props: UsersComponentPropsType) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }

    return <div>
      <div>
        {pages.map (p => {
          return <span key={p} className={props.currentPage === p ? s.selectedPage : s.page}
                       onClick={() => props.onPageChange(p)}
          >{p}</span>
        })}
      </div>
      {/*<button onClick={this.getUsers}>GetUsers</button>*/}
      {
        props.users.map(u => <div key={u.id}>
          <span>
            <div>
              <NavLink to={`/profile/${u.id}`}>
              <img src={u.photos.small ! = null ? u.photos.small : 'https://i.pravatar.cc/150?img=25'} />
              </NavLink>
            </div>
            {u.followed
              ? <button disabled={props.followingInProgress.some((id: any) => id === u.id)} onClick={() => {
                props.unfollow(u.id)
                // props.toggleFollowingProgress(true, u.id)
                // usersAPI.unfollow(u.id)
                // // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                // //   withCredentials: true,
                // //   headers: {
                // //     "API-KEY": "fda9637c-5329-4353-928c-78e8666bfa40"
                // //   },
                // // })
                //   .then((response) => {
                //     console.log('отписались')
                //     if (response.data.resultCode === 0) {
                //       props.unfollow(u.id)
                //     }
                //     props.toggleFollowingProgress(false, u.id)
                //   })
                //   .catch((err) => {
                //     console.log('err');
                //   })
              }
              }>Unfollow</button>
              : <button disabled={props.followingInProgress.some((id: any) => id === u.id)} onClick={() => {
                props.follow(u.id)
                // props.toggleFollowingProgress(true, u.id)
                // usersAPI.follow(u.id)
                // // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                // //   withCredentials: true,
                // //   headers: {
                // //     "API-KEY": "fda9637c-5329-4353-928c-78e8666bfa40"
                // //   },
                // // })
                //   .then((response) => {
                //     console.log('подписались')
                //     if (response.data.resultCode === 0) {
                //       props.follow(u.id)
                //     }
                //     props.toggleFollowingProgress(false, u.id)
                //   })
                //   .catch((err) => {
                //     console.log('err');
                //   })
              }
              }>Follow</button>}
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.country"}</div>
              <div>{"u.location.city"}</div>
            </span>
          </span>
        </div> )
      }
    </div>
}

export default Users