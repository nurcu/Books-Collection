import React, {useState, useContext, useEffect} from 'react';
import { GlobalContext } from "./context/GlobalState";
import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/EditPosition/EditPosition.module.css';
import { BsPencil } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import Button from  './UI/Button';
import UserFormField from './UI/FormField';
import Axios from "axios";
import SelectAssetType from './UI/SelectAssetType';

const EditPosition = (props) => {
    const [selectedPosition, setSelectedPosition] = useState({
        positionName: '',
        positionProtocol: '',
        positionAsset: 0,
        positionAssetType: ''
    })
    const { positions, editPosition } = useContext(GlobalContext);
    const history = useHistory();
    const currentPositionId = props.match.params.id;

    useEffect(() => {
        const positionId = currentPositionId;
        const selectedPosition = positions.find(position => position._id === positionId)
        setSelectedPosition(selectedPosition);
    }, [currentPositionId, positions])

    const updateFood = function (id) {
        const {positionName, positionProtocol, positionAsset, positionAssetType} = selectedPosition

        Axios.put("http://localhost:3004/update", {
            id: id,
            positionName: positionName,
            positionProtocol: positionProtocol,
            positionAsset: Number(positionAsset),
            positionAssetType: positionAssetType
        });
    };

    const onSubmit = function(e){

        editPosition(selectedPosition)
        history.push('/')
        updateFood(currentPositionId)
    }

    const onPositionNameChange = function(e){
        setSelectedPosition({...selectedPosition,[e.target.name]: e.target.value})
    }

    const onPositionProtocolChange = function(e){
        setSelectedPosition({...selectedPosition,[e.target.name]: e.target.value})
    }

    const onPositionAssetChange = function(e){
        setSelectedPosition({...selectedPosition,[e.target.name]: e.target.value})
    }

    const onPositionAssetTypeChange = function(e){
        setSelectedPosition({...selectedPosition,[e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={onSubmit} className={styles.form}>
            <UserFormField
                label="Position Title"
                name="positionName"
                value={selectedPosition.positionName}
                type="text"
                placeholder="enter position title"
                onChange={onPositionNameChange}
            />

            <UserFormField
                label="Protocol"
                name="positionProtocol"
                value={selectedPosition.positionProtocol}
                type="text"
                placeholder="enter position Protocol"
                onChange={onPositionProtocolChange}

            />

            <UserFormField
                label="Asset"
                name="positionAsset"
                value={selectedPosition.positionAsset}
                type="text"
                placeholder="enter position asset"
                onChange={onPositionAssetChange}

            />
            <SelectAssetType name="positionAssetType" onChange={onPositionAssetTypeChange} value={selectedPosition.positionAssetType}/>

            <div className={styles.buttons}>
                <Button type="submit" className={styles.edit_position}> <BsPencil/> Done</Button>
                <Link to="/" className={styles.link}> <GiCancel/> Cancel</Link>
            </div>
        </form>
    )
}

export default EditPosition