import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header, Label } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup'
import ValidationErrors from '../errors/ValidationErrors';

export default observer(function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => setErrors({error}))}

            validationSchema = {Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to React'color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() => 
                            <ValidationErrors errors={errors.error}/>} 
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})