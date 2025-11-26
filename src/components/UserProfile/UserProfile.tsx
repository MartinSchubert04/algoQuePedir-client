import { UserCircle } from "phosphor-react"
import "./userProfile.css"

type UserProfileType = {
    name: string,
    email: string
}

export const UserProfile = ({name, email}: UserProfileType) => {
    return (
        <div className="profile-container">
            <UserCircle className="user-img" size={32} />
            <p className="profile-name">{name}</p>
            <p className="profile-email">{email}</p>
        </div>
    )
}