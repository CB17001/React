import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { Header, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup'
import { Activity, ActivityFormValues } from '../../../app/models/activity';

export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const { createActivity, updateActivity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required('The activity category is required'),
        date: Yup.string().required('The activity date is required').nullable(),
        city: Yup.string().required('The activity city is required'),
        venue: Yup.string().required('The activity venue is required'),
    })


    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!!))
    }, [id, loadActivity]);

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            
        </Segment>
    )
})