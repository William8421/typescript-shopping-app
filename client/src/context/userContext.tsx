import { createContext, useContext, useState } from "react";
import { AddItemProps, DeleteItemProps, ItemsDataProps, NewItemProps, SignInUserDataProps, SignUpUserDataProps, UpdateData, UserContext, UserDataProps, UserProviderProps, UserStorage } from "../types/userTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const UserContext = createContext({} as UserContext)

export function useUser(){
    return useContext(UserContext)
}

export function UserProvider({children}: UserProviderProps){
    const navigate = useNavigate()

    // burger menu
    const [menu, setMenu] = useState('off');
    const [burger, setBurger] = useState('close');

    function switcher() {
      setMenu(menu === 'off' ? 'on' : 'off');
      setBurger(burger === 'close' ? 'open' : 'close');
      
    }
    //============================================================================================================

    // sign-in-up modals
    const [isLoginModalOpen, setIsLoginModalOpen] = useState('loginModalOff')
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState('signUpModalOff')

    function openCloseLoginModal(){
      setIsLoginModalOpen(isLoginModalOpen === 'loginModalOff'? 'loginModalOn' : 'loginModalOff')
    }
    function openCloseSignUpModal(){
      setIsSignUpModalOpen(isSignUpModalOpen === 'signUpModalOff'? 'signUpModalOn' : 'signUpModalOff')
    }
    //============================================================================================================

    const clientAPI = axios.create({baseURL: 'https://shopping-cart-server-chi.vercel.app'})

    const isLoggedIn = JSON.parse(localStorage.getItem("user")!)

    // store items data
    const [allData, setAllData] = useState([])

    async function fetchData(){     
      const allItems = (await clientAPI.get('/items/allitems'))          
      setAllData(allItems.data)
    }
    //============================================================================================================

    // token validator
    async function validateToken() {
      if (!localStorage.getItem("user")) {
        return null;
      } else {
        const response = await clientAPI.get("/user/tokenValidation", {
          headers: {
            Authorization: `Bearer ${isLoggedIn.token}`,
          },
        });
        if(response?.data.message){
          signOut() 
        }
      }
    };
    //============================================================================================================

    // sign in
    async function signIn(userData: SignInUserDataProps){
      try {
        const response = await clientAPI.post('/user/signin', userData)
        const userStorage: UserStorage = {
          username: response.data.user.username,
          id: response.data.user.id,
          token: response.data.token
        };
        localStorage.setItem("user", JSON.stringify(userStorage));
        switcher()
        navigate('myprofile')            
      } catch (error: any) {
        if(error.response.data.errors){
          alert(error.response.data.errors[0].msg);                
      }
      else if(error.response){
          alert(error.response.data.msg);                
      }
      console.log(error);
      }
    }
    //============================================================================================================

    //sign up
    async function signingUp(userData: SignUpUserDataProps) {
      try {
        const response = await clientAPI.post('/user/signup', userData)
        const userStorage = {
          username: response.data.user.username,
          id: response.data.user.id,
          token: response.data.token,
        };
        localStorage.setItem("user", JSON.stringify(userStorage));
          switcher()
          navigate('/myprofile')
      } catch (error: any) {
        if(error.response.data.msg){

          alert(error.response.data.msg)           
      }else if(error.response.data.errors[0].msg){
          alert(error.response.data.errors[0].msg)
      }
      console.log(error);
      }
    }
    //============================================================================================================
    
    // sign out
    function signOut(){
      localStorage.removeItem('user');
      switcher()
      navigate('/store')
    }
    //============================================================================================================

    // get user information
    const [userData, setUserData] = useState<UserDataProps[]>([])
    async function getUserInfo(){
      try {
        await clientAPI.post('/user/getinfo', isLoggedIn)
        .then(response => 
          setUserData(response.data)
          )
        
      } catch (error) {
        console.log(error);
      }
    }
    //============================================================================================================

    // update user information
    async function editUserInfo(newInfo: UpdateData) {
      try {
        await clientAPI.post('/user/updateprofile', newInfo)
        localStorage.setItem("user", JSON.stringify(isLoggedIn))
        window.location.href = '/myprofile'
      } catch (error) {
        console.log(error);
      }
    }
    //============================================================================================================

    // get user items
    const [itemsData, setItemsData] = useState<ItemsDataProps[]>([])
    
    async function getUserItems() {
      await clientAPI.post('/items/useritems', isLoggedIn)
      .then(response => setItemsData(response.data))
    }
    //============================================================================================================

    // additem
    async function AddItem(newItem: AddItemProps) {
      await clientAPI.post('/items/additems', newItem)  
    }          
    //============================================================================================================       

    //updateItem
    async function updateItem(newItemInfo: NewItemProps) {
      try {
        await clientAPI.post('/items/updateitem', newItemInfo)
      } catch (error) {
        console.log(error);            
      }
    }
    //============================================================================================================       

    //delete item
    async function removeItem(item: DeleteItemProps) {
      try {
        await clientAPI.post('/items/removeitem', item)
      } catch (error) {
        console.log(error);
      }
    }


    return <UserContext.Provider value={{
        switcher,
        menu,
        burger,
        openCloseLoginModal,
        openCloseSignUpModal,
        clientAPI,
        isLoggedIn,
        fetchData,
        allData,
        validateToken,
        signIn,
        signingUp,
        signOut,
        getUserInfo,
        userData,
        editUserInfo,
        getUserItems,
        itemsData,
        AddItem,
        updateItem,
        removeItem
    }}>
        {children}
        {<SignIn isLoginModalOpen= {isLoginModalOpen} openCloseLoginModal={openCloseLoginModal} />}
        {<SignUp isSignUpModalOpen= {isSignUpModalOpen} openCloseSignUpModal={openCloseSignUpModal}/>}
    </UserContext.Provider>
}