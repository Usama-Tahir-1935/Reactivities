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

// The ActivityForm component is a dynamic form that handles both creating and updating activities.It uses MobX to manage activity-related data and Formik with Yup for form handling and validation.
// When the user submits the form, it either creates a new activity (with a generated ID) or updates an existing one based on the URL's id.

export default observer(function ActivityForm() {
    const { activityStore } = useStore(); // The activityStore is accessed from MobX, and it provides functions like ...
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const navigate = useNavigate(); // After successfully creating or updating the activity, the user is navigated to the activity's detail page using navigate.

    const { id } = useParams(); // Extracts the id from the URL. If an id exists, it means the form is for editing an existing activity. Otherwise, it's for creating a new activity.
    const [activity, setActivity] = useState<Activity>({ // Initializes an empty Activity object with default values. These fields will be populated when editing an activity.
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    //  Defines the validation rules for each field. which will be shown if the user does not fill in the required fields.
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.date().nullable().required('Date is required'),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    });

    // useEffect: If there is an id in the URL (meaning the user is editing an existing activity), loadActivity is called to fetch the activity details from the store. Once the data is loaded, setActivity updates the form fields with the retrieved activity data.
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    // If the activity.id is empty, a new activity is created. A unique id is generated using the uuid library.
    function handleFormSubmit(activity: Activity) {
        console.log('Submitting activity: ', activity); // For debugging date issues
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else { // If the activity.id is not empty, the existing activity is updated.
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    // If the activity data is being fetched (loadingInitial is true), a loading component is shown until the data is ready.
    if (loadingInitial) return <LoadingComponent content="Loading activity..." />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color="teal" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="title" placeholder="Title" />
                        <MyTextArea placeholder='Description' name="description" rows={3} />
                        <MySelectInput placeholder='Category' name="category" options={CategoryOptions} />
                        <MyDateInput
                            placeholder='Date'
                            name="date"
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMM d, yyyy h:mm aa'
                        />

                        <Header content='Location Details' sub color="teal" />
                        <MyTextInput placeholder='City' name="city" />
                        <MyTextInput placeholder='Venue' name="venue" />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated="right"
                            positive type="submit"
                            content="Submit" />
                        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});
