import style from './Users.module.css.module.css'
import {DialogsPageType, UsersPageType} from "../../redux/store";
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";

export const Users = (props: UsersPropsType) => {
  const getUsers = () => {
    if (props.usersPage.users.length === 0) {
      axios.get('https://social-network.samuraijs.com/api/1.0/users')
        .then((response) => {
          console.log(response.data.items)
          props.setUsers(response.data.items)
        });
    }
  }

  //   props.setUsers( [
  //       {
  //         id: 1,
  //         avatar: 'https://i.pravatar.cc/150?img=53',
  //         followed: false,
  //         name: 'Dmitry',
  //         message: 'I am looking for a Job...',
  //         location: {country: 'Belarus', city: 'Minsk'}
  //       },
  //       {
  //         id: 2,
  //         avatar: 'https://i.pravatar.cc/150?img=25',
  //         followed: true,
  //         name: 'Sveta',
  //         message: 'I am so pretty',
  //         location: {country: 'Belarus', city: 'Minsk'}
  //       },
  //       {
  //         id: 3,
  //         avatar: 'https://i.pravatar.cc/150?img=18',
  //         followed: true,
  //         name: 'Igor',
  //         message: 'I am so pretty',
  //         location: {country: 'Belarus', city: 'Minsk'}
  //       },
  //       {
  //         id: 4,
  //         avatar: 'https://i.pravatar.cc/150?img=66',
  //         followed: false,
  //         name: 'Max',
  //         message: 'I am so pretty',
  //         location: {country: 'Belarus', city: 'Minsk'}
  //       },
  //     ])
  // }

  return (
    <div>
      <button onClick={getUsers}>GetUsers</button>
      {
        props.usersPage.users.map(u => <div key={u.id}>
          <span>
            <div>
              <img src={u.photos.small ! =null ? u.photos.small : 'https://i.pravatar.cc/150?img=25'} />
            </div>
              {u.followed ? <button onClick={() => { props.follow(u.id) } }>Unfollow</button>
                : <button onClick={() => { props.unfollow(u.id) } }>Follow</button>}
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
  );
}