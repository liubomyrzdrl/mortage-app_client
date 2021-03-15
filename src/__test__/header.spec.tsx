import React from "react";
import { shallow } from "enzyme";
import Header from '../components/Header';

const setUp = () => shallow(<Header  />) 

describe("Shoud render Header component", () => {
    let component;
    beforeEach(() => {
         component = setUp();
    })
    it("Should contain div", () => {        
        const wrapper = component.find("div");
        expect(wrapper.length).toBe(1)
    });

    // it("Should render created date", () => {        
    //     const created_at = "01=03-2020";
    //     componennt = setUp({ created_at});
    //     const date = component.find(".date"); 
    //     expect(date.text()).toBe(new Date(created_at).toLocaleDateString());
    // });
});