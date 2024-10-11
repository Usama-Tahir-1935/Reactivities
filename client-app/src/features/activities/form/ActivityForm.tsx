import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Activity } from "../../../models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "./MyTextArea";
import MySelectInput from "./MySelectInput";
import { CategoryOptions } from "../../../app/common/form/options/CategoryOptions";
import MyDateInput from "./MyDateInput";
import { v4 as uuid } from 'uuid';


export default observer (function ActivityForm () {
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const navigate = useNavigate();

    // is used in React (with React Router) to extract route parameters from the URL. 
    const {id} = useParams(); 
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.date().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })


    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!)); // "!" it means we turn off the TypeScript functionality here. 
    }, [id, loadActivity]);
    
    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    if(loadingInitial) return <LoadingComponent content="Loading activity..."/>

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color="teal" />
            <Formik
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="title" placeholder="Title"/>
                        <MyTextArea placeholder='Description' name="description" rows={3}/>
                        <MySelectInput placeholder='Category' name="category" options={CategoryOptions}/>
                        <MyDateInput 
                            placeholder='Date' 
                            name="date"
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMM d, yyyy h:mm aa'    
                        />

                        <Header content='Location Details' sub color="teal" />
                        <MyTextInput placeholder='City' name="city"/>
                        <MyTextInput placeholder='Venue' name="venue"/>
                        <Button 
                            disabled={ isSubmitting || !dirty || !isValid }
                            loading={loading} 
                            floated="right" 
                            positive type="submit"
                            content="Submit" />
                        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
            
        </Segment>
    )
}) 
