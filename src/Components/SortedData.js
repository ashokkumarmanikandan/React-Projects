const SortedData = ((props) => {
    const {sort, setSort} = props;

    const handleSortChange = (e) => {
        setSort(e.target.value);
    }

    return (
        <div>
            <select style={{padding: '5px', margin: '5px'}} value={sort} onChange={handleSortChange}>
                <option value={"ID-Asc"}>ID-Asc</option>
                <option value={"ID-Dsc"}>ID-Dsc</option>
                <option value={"Name-Asc"}>Name-Asc</option>
                <option value={"Name-Dsc"}>Name-Dsc</option>
                <option value={"Auth-Asc"}>Auth-Asc</option>
                <option value={"Auth-Dsc"}>Auth-Dsc</option>
                <option value={"Year-Asc"}>Year-Asc</option>
                <option value={"Year-Dsc"}>Year-Dsc</option>
            </select>
        </div>
    )
})

export default SortedData;