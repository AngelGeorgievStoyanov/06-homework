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







export default function Register({ user, onRegister, onTogle, admin }: UserProps) {
    const { control, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm<FormData>({
        defaultValues: { ...user },

        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const registerSubmitHandler = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        event?.preventDefault();
       
        const newUser = { ...data, timeCreated: toIsoDate(new Date()), timeEdited: toIsoDate(new Date()),  }
      
        onRegister(newUser);
      
        reset({ ...user });
    }


    const onReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        console.log("RESET to:", user);
        reset();
    }

    return (
        <>
      
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
                        {user?.status === 1 ? 'ACTIVE'
                            : user?.status === 2 ? 'SUSPENDED' : 'DEACTIVATED'}
                    </Typography>  </> : ''}
                <Button variant="contained" endIcon={<SendIcon />} type='submit' disabled={!(isDirty && isValid)}>
                    Submit
                </Button>
                <Button variant="contained" endIcon={<CancelIcon />} color='warning' type='reset'>
                    Reset
                </Button>
                {!user ? <Button variant="contained" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onTogle(e)} sx={{':hover':{color:'rgb(248 245 245)'} ,background: 'rgb(194 194 224)', color: 'rgb(144 144 166)' }} >Already Have An Account?</Button>:''}


            </Box>



        </>
    )
}
// }