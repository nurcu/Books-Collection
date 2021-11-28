import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./context/GlobalState";
import { BsPencil } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import Axios from "axios";
import styles from "../styles/PositionList/PositionList.module.css";
import Button from "./UI/Button";

const PositionList = () => {
    const { positions, removePosition } = useContext(GlobalContext);

    const removeHandler = (id) => {
        removePosition(id);
        Axios.delete(`http://localhost:3004/delete/${id}`);
    };

    return (
        <table className={styles["content-table"]}>
            <thead>
                <tr>
                    <th className={styles.title}>Position Title</th>
                    <th className={styles.protocol}>Protocol</th>
                    <th className={styles.assetType}>AssetType</th>
                    <th className={styles.asset}>Asset</th>
                    <th className={styles.asset}>Actions</th>
                </tr>
            </thead>
            {positions.length > 0 && (
                <tbody>
                    {positions.map((position) => {
                        return (
                            <tr key={position._id}>
                                <td>{position.positionName}</td>
                                <td>{position.positionProtocol}</td>
                                <td>{position.positionAssetType}</td>
                                <td>{position.positionAsset}</td>
                                <td>
                                    <div className="actions">
                                        <Link
                                            to={`/edit/${position._id}`}
                                            id={styles.link}
                                            className={styles.link}
                                        >
                                            <BsPencil />
                                            Edit
                                        </Link>
                                        <Button
                                            onClick={() =>
                                                removeHandler(position._id)
                                            }
                                            className={styles.button}
                                        >
                                            <MdDeleteForever />
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            )}
        </table>
    );
};

export default PositionList;
