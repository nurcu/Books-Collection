import React, { useState, useContext, useReducer, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import styles from "../styles/AddNewPosition/AddNewPosition.module.css";
import { GiCancel } from "react-icons/gi";
import Button from "./UI/Button";
import FormField from "./UI/FormField";
import SelectAssetType from "./UI/SelectAssetType";

const AddPosition = () => {
    const { addPosition } = useContext(GlobalContext);
    const history = useHistory();
    const [isFormValid, setIsFormValid] = useState(false);

    //position title
    const [positionTitle, dispatchPositionTitle] = useReducer(
        (state, action) => {
            if(action.type === "POSITION_INPUT"){
                return {value: action.val, isValid: action.val.length > 5}
            }
            
            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    //position asset
    const [positionProtocol, dispatchPositionProtocol] = useReducer(
        (state, action) => {
            if(action.type === "POSITION_INPUT"){
                return {value: action.val, isValid: action.val.length > 5}
            }

            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    //positionasset
    const [positionAsset, dispatchPositionAsset] = useReducer(
        (state, action) => {
            if(action.type === "POSITION_INPUT"){
                return {value: action.val, isValid: action.val.length >= 1}
            }

            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    //positionSelect
    const [positionAssetType, dispatchPositionAssetType] = useReducer(
        (state, action) => {
            if(action.type === 'POSITION_INPUT'){
                return {value: action.val, isValid: action.val !== ''}
            }

            return {value: '', invalid: false}
        },
        {value: '', isValid: false}
    )

    const { isValid: positionTitleIsValid} = positionTitle;
    const { isValid: positionProtocolIsValid} = positionProtocol;
    const { isValid: positionAssetIsValid} = positionAsset;
    const { isValid: positionAssetTypeIsValid} = positionAssetType;

    //useEffect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFormValid(
                positionTitleIsValid &&
                positionProtocolIsValid &&
                positionAssetIsValid &&
                positionAssetTypeIsValid !== false
            );
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [positionTitleIsValid, positionProtocolIsValid, positionAssetIsValid, positionAssetTypeIsValid]);


    const onSubmit = function (e) {
        e.preventDefault()
        if(isFormValid !== true) return

        const newPosition = {
            positionName: positionTitle.value,
            positionProtocol: positionProtocol.value,
            positionAsset: positionAsset.value,
            positionAssetType: positionAssetType.value,
        };

        Axios.post("http://localhost:3004/insert", {
            positionName: positionTitle.value,
            positionAsset: positionAsset.value,
            positionProtocol: positionProtocol.value,
            positionAssetType: positionAssetType.value,
        });
        addPosition(newPosition);
        history.push("/");
    };

    const onPositionTitleChange = function (e) {
        dispatchPositionTitle({type: "POSITION_INPUT", val: e.target.value} )
    };

    const onProtocolChange = function (e) {
        dispatchPositionProtocol({type: 'POSITION_INPUT', val: e.target.value});
    };

    const onAssetChange = function (e) {
        dispatchPositionAsset({type: "POSITION_INPUT", val: e.target.value})
        
    };

    const onAssetTypeChange = function (e) {
        dispatchPositionAssetType({type: "POSITION_INPUT", val: e.target.value});
    };

    return (
        <form onSubmit={onSubmit} className={`${styles.form}`}>
            <FormField
                label="Position Title"
                value={positionTitle.value}
                type="text"
                placeholder="enter position title"
                onChange={onPositionTitleChange}
                className={`${positionTitle.isValid === false ? styles.invalid : ''}`}
            />

            <FormField
                label="Protocol"
                value={positionProtocol.value}
                type="text"
                placeholder="enter position Protocol"
                onChange={onProtocolChange}
                className={`${positionProtocol.isValid === false ? styles.invalid : ''}`}
            />

            <FormField
                label="Asset"
                value={positionAsset.value}
                type="text"
                placeholder="enter position asset"
                onChange={onAssetChange}
                className={`${positionAsset.isValid === false ? styles.invalid : ''}`}
            />

            <SelectAssetType onChange={onAssetTypeChange}/>

            <div className={styles.buttons}>
                <Button type="submit" className={`${isFormValid ? styles.submit : styles.disabled}`}>
                    Submit
                </Button>
                <Link to="/" className={styles.link}>
                    <GiCancel /> Cancel
                </Link>
            </div>
        </form>
    );
};

export default AddPosition;
