import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Subtract 1 if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };
    const months = [" ", "jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotsDateFormat = (slotDate) => {
    const dateArray = slotDate.split('-')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

    const value = {
        calculateAge,
        slotsDateFormat
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
