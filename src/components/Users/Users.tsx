import style from './Users.module.css.module.css'
import {DialogsPageType, UsersPageType} from "../../redux/store";
import axios from "axios";
import s from "./UsersContainer.module.css";
import {UserType} from "../../redux/users-reduser";

type UsersComponentPropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  users: UserType[]
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  onPageChange: (pageNumber: number) => void
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
              <img src={u.photos.small ! = null ? u.photos.small : 'https://i.pravatar.cc/150?img=25'} />
            </div>
            {u.followed ? <button onClick={() => { props.unfollow(u.id) } }>Unfollow</button>
              : <button onClick={() => { props.follow(u.id) } }>Follow</button>}
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{"u.status"}</div>
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