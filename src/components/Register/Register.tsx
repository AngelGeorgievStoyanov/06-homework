import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import userEvent from "@testing-library/user-event";
import React, { BaseSyntheticEvent, Component, FormEvent } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { User, UserGender, UserRegister, UserRole, UserStatus } from "../model/users";
import { Optional, UserListener } from "../shared/common-types";
import { toIsoDate } from "../shared/utils";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import './Register.css'
import FormInputSelect, { SelectOption } from "../FormInputSelect/FormInputSelect";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Typography from "@mui/material/Typography/Typography";


interface UserProps {
    user: Optional<User>
    onRegister: UserListener;
    onTogle: React.MouseEventHandler<HTMLButtonElement>
    admin: 2 | undefined | boolean


}

// interface UserRegisterState {

//     firstName: string;
//     lastName: string;
//     username: string;
//     password: string;
//     rePass: string;
//     gender: string;
//     role: string;
//     imageUrl?: string;
//     description?: string;
//     timeCreated: string;
//     timeEdited?: string;
//     status: string;

// }



type FormData = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    rePass: string;
    gender: UserGender;
    role: UserRole;
    imageUrl?: string;
    description?: string;
    timeCreated: string | undefined;
    timeEdited?: string | undefined;
    status: UserStatus
};



const USER_SELECT_OPTIONS_GENDER: SelectOption[] = Object.keys(UserGender)
    .filter((item) => !isNaN(Number(item)))
    .map((ordinal: string) => parseInt(ordinal))
    .map((ordinal: number) => ({ key: ordinal, value: UserGender[ordinal] }));

const USER_SELECT_OPTIONS_ROLE: SelectOption[] = Object.keys(UserRole)
    .filter((item) => !isNaN(Number(item)))
    .map((ordinal: string) => parseInt(ordinal))
    .map((ordinal: number) => ({ key: ordinal, value: UserRole[ordinal] }));

const USER_SELECT_OPTIONS_STATUS: SelectOption[] = Object.keys(UserStatus)
    .filter((item) => !isNaN(Number(item)))
    .map((ordinal: string) => parseInt(ordinal))
    .map((ordinal: number) => ({ key: ordinal, value: UserStatus[ordinal] }));

const schema = yup.object({
    id: yup.number().positive(),
    firstName: yup.string().required().min(2).max(40),
    lastName: yup.string().required().min(2).max(1024),
    username: yup.string().required(),
    password: yup.string().required(),
    rePass: yup.string().test('passwords-match', 'Passwords must match', function (value) { return this.parent.password === value }),
    gender: yup.number().required(),
    role: yup.number().required(),
    imageUrl: yup.string(),
    description: yup.string(),
    timeCreated: yup.string(),
    timeEdited: yup.string(),

}).required();




// export default class Register extends Component<UserProps, UserRegisterState> {

//     state: Readonly<UserRegisterState> = {
//         firstName: this.props.user?.firstName || '',
//         lastName: this.props.user?.lastName || '',
//         username: this.props.user?.username || '',
//         password: this.props.user?.password || '',
//         rePass: this.props.user?.rePass || '',
//         gender: this.props.user?.gender.toString() || '1',
//         role: this.props.user?.role.toString() || '1',
//         imageUrl: this.props.user?.imageUrl || '',
//         description: this.props.user?.description || '',
//         timeCreated: this.props.user?.timeCreated || '',
//         timeEdited: this.props.user?.timeEdited || '',
//         status: this.props.user?.status.toString() || '1'
//     };
export default function Register({ user, onRegister, onTogle, admin }: UserProps) {
    const { control, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm<FormData>({
        defaultValues: { ...user },

        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const registerSubmitHandler = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        event?.preventDefault();
        console.log(data)
        const newUser = { ...data, timeCreated: toIsoDate(new Date()), timeEdited: toIsoDate(new Date()), status: 1, }
        console.log(newUser,);
        onRegister(newUser);
        console.log("RESET to:",);
        reset({ ...user });
    }


    const onReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('RESETING FORM');
        console.log("RESET to:", user);
        reset();
    }


    // if (this.state.firstName === '') {
    //     throw new Error('First Name is required')
    // }
    // if (this.state.lastName === '') {
    //     throw new Error('Last Name is required')
    // }
    // if (this.state.username === '') {
    //     throw new Error('Username is required')
    // }
    // if (this.state.password === '') {
    //     throw new Error('Password is required')
    // }
    // if (this.state.rePass === '') {
    //     throw new Error('Confirm Password is required')
    // }

    // if (this.state.password !== this.state.rePass) {
    //     throw new Error('Password and Confirm Password don\'t match')
    // }


    // this.props.mainHid(event)

    // this.props.onRegister(
    //     this.props.user?.id ?
    //         new User(
    //             this.props.user.id,
    //             this.state.firstName,
    //             this.state.lastName,
    //             this.props.user.username,
    //             this.state.password,
    //             this.state.rePass,
    //             parseInt(this.state.gender),
    //             parseInt(this.state.role),
    //             this.state.imageUrl,
    //             this.state.description,
    //             this.state.timeCreated,
    //             toIsoDate(new Date()),
    //             parseInt(this.state.status)

    //         ) :
    //         new UserRegister(
    //             this.state.firstName,
    //             this.state.lastName,
    //             this.state.username,
    //             this.state.password,
    //             this.state.rePass,
    //             parseInt(this.state.gender),
    //             parseInt(this.state.role),
    //             this.state.imageUrl,
    //             this.state.description,
    //             toIsoDate(new Date()),

    //         )

    // )

    // }
    // handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    //     const fieldName = event.target.name;
    //     this.setState({ [fieldName]: event.target.value } as unknown as UserRegisterState);
    // }

    // render() {

    return (
        <>
            {/* <section className='section-form-regiser'>
                    <div className="register-div">
                        {this.props.user ? <h3>Edit Form</h3> : this.props.admin === true ? <h3>Create User Form</h3> : <h3>Register Form</h3>}
                    </div>
                    <form method="POST" onSubmit={this.registerSubmitHandler} className='form-register'>
                        <span className='span-register'>
                            <label htmlFor="firstName">First Name : </label>
                            <input type="text" name='firstName' minLength={2} maxLength={15} value={this.state.firstName} onChange={this.handleChange} />
                        </span>

                        <span className='span-register'>
                            <label htmlFor="lastName">Last Name : </label>
                            <input type="text" name='lastName' minLength={2} maxLength={15} value={this.state.lastName} onChange={this.handleChange} />
                        </span>

                        <span className='span-register'>
                            <label htmlFor="username">Username : </label>
                            {this.props.user ? <input type="text" name='username' minLength={5} maxLength={15} disabled value={this.state.username} onChange={this.handleChange} />
                                : <input type="text" name='username' minLength={5} maxLength={15} value={this.state.username} onChange={this.handleChange} />}
                        </span>

                        <span className='span-register'>
                            <label htmlFor="password">Password : </label>
                            <input type="password" name='password' value={this.state.password} onChange={this.handleChange} />
                        </span>

                        <span className='span-register'>
                            <label htmlFor="rePass">Confirm Password : </label>
                            <input type="password" name='rePass' value={this.state.rePass} onChange={this.handleChange} />
                        </span>

                        <span className='span-register'>
                            <label htmlFor="gender">Gender : </label>
                            <select name='gender' value={this.state.gender} onChange={this.handleChange} >
                                <option value={UserGender.MALE}>MALE</option>
                                <option value={UserGender.FEMALE}>FEMALE</option>
                            </select>
                        </span>

                        <span className='span-register' >
                            <label htmlFor="select-role">Role : </label>
                            <select name='role' value={this.state.role} onChange={this.handleChange}>
                                <option value={UserRole.USER}>USER</option>
                                <option value={UserRole.ADMIN}>ADMIN</option>
                            </select>
                        </span>
                        <span className='span-register'>
                            {this.props.admin === true ?
                                <>
                                    <label htmlFor="status">Status : </label>
                                    <select name='status' value={this.state.status} onChange={this.handleChange} >
                                        <option value={UserStatus.ACTIVE}>ACTIVE</option>
                                        <option value={UserStatus.DEACTIVATED}>DEACTIVATED</option>
                                        <option value={UserStatus.SUSPENDED}>SUSPENDED</option>
                                    </select>
                                </>
                                : this.props.user ? <><h4>Your status : {this.props.user?.status === 1 ? 'ACTIVE'
                                    : this.props.user?.status === 2 ? 'SUSPENDED' : 'DEACTIVATED'} </h4> </> : ''}
                        </span>

                        <span className='span-register'>
                            <label htmlFor="imageUrl">Image URL : </label>
                            <input type="text" name='imageUrl' value={this.state.imageUrl} onChange={this.handleChange} />
                        </span>

                        <span className='span-register'>
                            <label htmlFor="description">Description : </label>
                            <textarea name="description" cols={20} rows={4} maxLength={512} value={this.state.description} onChange={this.handleChange}  ></textarea>
                        </span>
                        <div className="buttons-register">
                            {this.props.user ? <input className='button-register' type="submit" value={'EDIT PROFILE'} /> : this.props.admin === true ?
                                <input className='button-register' type="submit" value={'CREATE PROFILE'} /> :
                                <input className='button-register' type="submit" value={'Sign Up'} />
                            }
                            {!this.props.user ? <button className='button-go-to-login' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.props.onTogle(e)} >Already Have An Account?</button> : ''}
                        </div>
                    </form>

                </section> */}


            <Box

                component="form"
                sx={{
                    backgroundColor: '#ddf',
                    padding: '20px',
                    '& .MuiFormControl-root': { m: 0.5, width: 'calc(100% - 10px)' },
                    '& .MuiButton-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(registerSubmitHandler)} onReset={onReset}
            >
                <Typography align="center" variant="h4" component="div">

                    {user ? 'Edit Form' : admin === true ? 'Create User Form' : 'Register Form'}

                </Typography>
                <FormInputText name='firstName' label='First Name' control={control} error={errors.firstName?.message}
                    rules={{ required: true, minLength: 2, maxLength: 40 }} />
                <FormInputText name='lastName' label='Last Name' control={control} error={errors.lastName?.message}
                    rules={{ required: true, minLength: 2, maxLength: 40 }} />
                <FormInputText name='username' label='Username' control={control} error={errors.username?.message}
                    rules={{ required: true, minLength: 2, maxLength: 1024 }} />
                <FormInputText name='password' label='Password' control={control} error={errors.password?.message}
                    rules={{}} />
                <FormInputText name='rePass' label='Confurm Password' control={control} error={errors.rePass?.message}
                    rules={{ required: true }} />
                <FormInputSelect name='gender' label='Gender' control={control} error={errors.gender?.message}
                    rules={{ required: true }} options={USER_SELECT_OPTIONS_GENDER} defaultOptionIndex={0} />

                <FormInputSelect name='role' label='Role' control={control} error={errors.role?.message}
                    rules={{ required: true }} options={USER_SELECT_OPTIONS_ROLE} defaultOptionIndex={0} />
                <FormInputText name='imageUrl' label='Image URL' control={control} error={errors.imageUrl?.message}
                />
                <FormInputText name='description' label='Description' control={control} error={errors.description?.message}
                />
                {admin === true ?
                    <>
                        <FormInputSelect name='status' label='Status' control={control} error={errors.status?.message}
                            rules={{ required: true }} options={USER_SELECT_OPTIONS_STATUS} defaultOptionIndex={0} />

                    
                    </>
                    : user ? <>  <Typography variant="h5" component="div">
                   { user?.status === 1 ? 'ACTIVE'
                        : user?.status === 2 ? 'SUSPENDED' : 'DEACTIVATED'} 
                </Typography>  </> : ''}
                <Button variant="contained" endIcon={<SendIcon />} type='submit' disabled={!(isDirty && isValid)}>
                    Submit
                </Button>
                <Button variant="contained" endIcon={<CancelIcon />} color='warning' type='reset'>
                    Reset
                </Button>
                {!user ? <button className='button-go-to-login' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onTogle(e)} >Already Have An Account?</button> : ''}

            </Box>



        </>
    )
}
// }