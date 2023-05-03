import { AxiosInstance } from "axios"
import { ReactNode } from "react"

export type UserProviderProps ={
    children: ReactNode
}
export type UserContext = {
    switcher: () => void
    menu: string
    burger: string
    openCloseLoginModal: () => void
    openCloseSignUpModal: () => void
    clientAPI: AxiosInstance
    isLoggedIn: UserStorage
    fetchData: () => void
    allData: any
    validateToken: () => void
    signIn: (userData: SignInUserDataProps) => Promise<void>
    signingUp: (userData: SignUpUserDataProps) => Promise<void>
    signOut: () => void
    getUserInfo: () => any
    userData: UserDataProps[]
    editUserInfo: (newInfo: UpdateData) => Promise<void>
    getUserItems: () => void
    itemsData: ItemsDataProps[]
    AddItem: (newItem: AddItemProps) => Promise<void>
    updateItem: (newItemInfo: NewItemProps) => Promise<void>
    removeItem: (item: DeleteItemProps) => Promise<void>
}

export type SignInUserDataProps = {
    email: string
    password: string
}

export type SignUpUserDataProps = {
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

export type ItemsDataProps = {
    itemId: number;
    itemName: string;
    price: number;
    imgUrl: string;
  }

export type NewItemProps = {
    itemId?: number;
    itemName?: string;
    price?: number;
    imgUrl?: string;    
}  

export type SelectedItemProps = {
  itemID: number
  itemName: string
}


export type UserDataProps = {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
}
export type UpdateData = {
    id: number
    username?: string
    firstName?: string
    lastName?: string
}

export type AddItemProps ={
    userId: number;
    itemName: string;
    price: number;
    imgUrl: string
}

export type UserStorage = {
    id: number
    username: string
    token: string
}

export type DeleteItemProps = {
    itemId: number
    itemName: string
}