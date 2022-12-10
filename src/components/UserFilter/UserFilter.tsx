import React from "react";
import { FilterChangeListener, FilterType } from "../AllUsers/AllUsers"


type UserFilterProps = {
    filterStatus: FilterType;
    filterRole: FilterType;
    onFilterChangeStatus: FilterChangeListener;
    onFilterChangeRole: FilterChangeListener

};


export const UserFilter = ({ filterStatus, filterRole, onFilterChangeStatus, onFilterChangeRole }: UserFilterProps) => {

    function handleFilterChangeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChangeStatus(event.target.value === '0' ? undefined : parseInt(event.target.value))
    }

    function handleFilterChangeRole(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChangeRole(event.target.value === '0' ? undefined : parseInt(event.target.value))
    }

    return (
        <>
            <select value={filterStatus} onChange={handleFilterChangeStatus}>
                <option value="0">ALL</option>
                <option value="1">ACTIVE</option>
                <option value="2">SUSPENDED</option>
                <option value="3">DEACTIVATED</option>
            </select>

            <select value={filterRole} onChange={handleFilterChangeRole}>
                <option value="0">ALL</option>
                <option value="1">USER</option>
                <option value="2">ADMIN</option>
            </select>
        </>
    )

}

export default UserFilter