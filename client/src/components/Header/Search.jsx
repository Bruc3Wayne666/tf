import React, {useEffect, useState} from 'react';
import classes from "./Header.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getDataAPI} from "../../api/fetchData";
import {TYPES} from "../../redux/actions/types";
import UserCard from "../UserCard/UserCard";
import {Link} from "react-router-dom";

const Search = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(false)
    const {authReducer: auth} = useSelector(state => state)
    const dispatch = useDispatch()

    // const handleSubmit = async e => {
    //     e.preventDefault()
    //     if (!search) return
    //     try {
    //         setLoad(true)
    //         const res = await getDataAPI(`user/search?username=${search}`, auth.token)
    //         setUsers(res.users)
    //         setLoad(false)
    //     } catch (err) {
    //         dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
    //     }
    // }

    useEffect(() => {
        const searchUsers = async () => {
            try {
                if (search) {
                    setLoad(true)
                    const res = await getDataAPI(`user/search?username=${search}`, auth.token)
                    setUsers(res.users)
                    setLoad(false)
                } else {
                    setUsers([])
                }
            } catch (err) {
                dispatch({type: TYPES.ALERT_ACTION, payload: {error: err.response.data.msg}})
            }
        }
        searchUsers()
    }, [search, auth.token])

    const handleClose = () => {
        setSearch('')
        setUsers([])
    }

    return (
        <form className={classes.searchForm}>
            <input type="text" name={'search'} value={search} id={'search'}
                   title={'Search people'} onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, '_'))}/>
            <div className={classes.searchIcon} style={{opacity: search ? 0 : 0.3}}>
                {/*<span className={'material-icons'}>Search</span>*/}
                <span>Search</span>
            </div>
            <div className={classes.closeSearch} onClick={handleClose} style={{opacity: users.length === 0 ? 0 : 1}}>
                &times;
            </div>
            <button type={'submit'} style={{display: 'none'}}>Search</button>
            {load && <img className={classes.loading} src={'LoadingIcon'} alt="loading"/>}
            <div className={classes.users}>
                {search && users.map(user => (
                    <Link to={`profile/${user._id}`}>
                        <UserCard
                            key={user._id}
                            user={user}
                            border={'border'}
                            handleClose={handleClose}
                        />
                    </Link>
                ))}
            </div>
        </form>
    );
};

export default Search;