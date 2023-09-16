const SeacrhBar = () => {

    return (
        <form className="flex shadow-md flex-col md:mx-[150px] p-6 mt-[30px] rounded-lg md:flex-row gap-3">
            <div className="flex w-full">
                <input type="text" placeholder="Search from 50000+ listing"
                    className="w-full md:w-100 px-3 h-10 rounded-l  focus:outline-none focus:border-grey-500"
                />
                    <button type="submit" className="bg-grey-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
            </div>
            <select id="pricingType" name="pricingType"
                className=" h-10  focus:outline-none focus:border-grey-500 text-grey-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                <option value="All" >Location</option>
                <option value="Freemium">India</option>
                <option value="Free">Kerala</option>
                <option value="Paid">Kannur</option>
            </select>
            <select id="pricingType" name="pricingType"
                className=" h-10  focus:outline-none focus:border-grey-500 text-grey-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                <option value="All" >Experience</option>
                <option value="Freemium">Fresher</option>
                <option value="Free">1 year</option>
                <option value="Paid">2 year</option>
            </select>
            {/* <select id="pricingType" name="pricingType"
                className=" h-10  focus:outline-none focus:border-grey-500 text-grey-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                <option value="All" >Title</option>
                <option value="Freemium">Web Developer</option>
                <option value="Free">Flutter Developer</option>
                <option value="Paid">Designer</option>
            </select> */}
            <select id="pricingType" name="pricingType"
                className=" h-10  focus:outline-none focus:border-grey-500 text-grey-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                <option value="All" >Salary</option>
                <option value="Freemium">Freemium</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
            </select>
        </form>
    )
}


export default SeacrhBar;