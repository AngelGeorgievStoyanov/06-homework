import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FilterChangeListener, FilterType } from "../AllUsers/AllUsers";


type UserFilterProps = {
    filterStatus: FilterType;
    filterRole: FilterType;
    onFilterChangeStatus: FilterChangeListener;
    onFilterChangeRole: FilterChangeListener;

};



export const UserFilter = ({ filterStatus, filterRole, onFilterChangeStatus, onFilterChangeRole }: UserFilterProps) => {




    function handleFilterChangeStatus(event: SelectChangeEvent<unknown>) {
        onFilterChangeStatus(event.target.value === '0' ? undefined : parseInt(event.target.value as string));
    }

    function handleFilterChangeRole(event: SelectChangeEvent<unknown>) {
        onFilterChangeRole(event.target.value === '0' ? undefined : parseInt(event.target.value as string));
    }

    return (
        <>

            <InputLabel id="label">STATUS</InputLabel>
            <Select labelId="label" id="status" value={filterStatus} onChange={handleFilterChangeStatus} sx={{ width: '135px' }}>
                <MenuItem sx={{ ':hover': { backgroundColor: '#9e9e9e', color: 'white' } }} value={'0'}>ALL</MenuItem>
                <MenuItem sx={{ ':hover': { backgroundColor: '#9e9e9e', color: 'white' } }} value={'1'}>ACTIVE</MenuItem>
                <MenuItem sx={{ ':hover': { backgroundColor: '#9e9e9e', color: 'white' } }} value={'2'}>SUSPENDED</MenuItem>
                <MenuItem sx={{ ':hover': { backgroundColor: '#9e9e9e', color: 'white' } }} value={'3'}>DEACTIVATED</MenuItem>
            </Select>


            <InputLabel id="label">ROLE</InputLabel>
            <Select labelId="label" id="status" value={filterRole} onChange={handleFilterChangeRole} sx={{ width: '120px' }}>
                <MenuItem sx={{ ':hover': { backgroundColor: '#9e9e9e', color: 'white' } }} value={'0'}>ALL</MenuItem>
                <MenuItem sx={{ ':hover': { backgroundColor: '#9e9e9e', color: 'white' } }} value={'1'}>USER</MenuItem>
                <MenuItem sx={{ ':hover': { backgroundColor: '#9e9e9e', color: 'white' } }} value={'2'}>ADMIN</MenuItem>
            </Select>


        </>
    )

}

export default UserFilter