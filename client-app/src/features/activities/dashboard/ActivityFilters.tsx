import React from "react";
// react-calendar provides a powerful, ready-made solution to handle date selection and display in 
// React applications, saving you from building a calendar component from scratch. "npm install react-calendar" or "@types/react-calendar".
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";


export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size="large" style={{ width: '100%', marginTop: 26 }}>
                <Header icon='filter' attached color='teal' content='Filters'/>
                <Menu.Item content='All Activities' />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hosting"/>
            </Menu>
            <Header/>
            <Calendar />
        </> 
    );
}