import styles from '../../styles/UI/SelectAssetType/SelectAssetType.module.css'

const SelectAssetType = (props) => {
    return(
        <article className={styles.select}>
                <select name={props.name} onChange={props.onChange} value={props.value}>
                    <option value="" selected disabled>
                        Categories
                    </option>
                    <option value="token">Token</option>
                    <option value="pool">Pool</option>
                </select>
            </article>
    )
}

export default SelectAssetType;