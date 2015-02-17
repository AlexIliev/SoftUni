namespace Customer
{
    using System;
    using System.Collections.Generic;
    using System.Text.RegularExpressions;

    public class Customer : ICloneable, IComparable<Customer>
    {
        private string firstName;
        private string middleName;
        private string lastName;
        private string id;
        private string permanentAddress;
        private string mobilePhone;
        private string email;
        private List<Payments> payments;
        private CustomerType customerType;

        public Customer(string firstName, string middleName, string lastName, string id, string permanentAddress, string mobilePhone,
            string email, List<Payments> payments, CustomerType customerType)
        {
            this.FirstName = firstName;
            this.MiddleName = middleName;
            this.LastName = lastName;
            this.ID = id;
            this.PermanentAddress = permanentAddress;
            this.MobilePhone = mobilePhone;
            this.Email = email;
            this.Payments = payments;
            this.CustomerType = customerType;
        }
        
        public string FirstName
        { 
            get
            {
                return this.firstName;
            }
            set
            {
                if (String.IsNullOrEmpty(value))
                {
                    throw new ArgumentNullException("First name cannot be empty!");
                }
                this.firstName = value;
            }
        }

        public string MiddleName
        {
            get
            {
                return this.middleName;
            }
            set
            {
                if (String.IsNullOrEmpty(value))
                {
                    throw new ArgumentNullException("Middle name cannot be empty!");
                }
                this.middleName = value;
            }
        }

        public string LastName
        {
            get
            {
                return this.lastName;
            }
            set
            {
                if (String.IsNullOrEmpty(value))
                {
                    throw new ArgumentNullException("Last name cannot be empty!");
                }
                this.lastName = value;
            }
        }

        public string ID
        {
            get
            {
                return this.id;
            }
            set
            {
                int idLength = value.Length;
                bool isIDValidLength = idLength == 10;

                if (!isIDValidLength)
                {
                    throw new ArgumentNullException("ID must be exactly ten numbers!");
                }
                this.id = value;
            }
        }

        public string PermanentAddress
        {
            get
            {
                return this.permanentAddress;
            }
            set
            {
                if (String.IsNullOrEmpty(value))
                {
                    throw new ArgumentNullException("Permanent address cannot be empty!");
                }
                this.permanentAddress = value;
            }
        }

        public string MobilePhone
        {
            get
            {
                return this.mobilePhone;
            }
            set
            {
                if (String.IsNullOrEmpty(value))
                {
                    throw new ArgumentNullException("Mobile phone cannot be empty!");
                }
                this.mobilePhone = value;
            }
        }

        public string Email
        {
            get
            {
                return this.email;
            }
            set
            {
                string emailRegex = @"^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
                var emailMatch = new Regex(emailRegex);
                bool isEmailValid = emailMatch.IsMatch(value);

                if (String.IsNullOrEmpty(value) &&  isEmailValid)
                {
                    throw new ArgumentNullException("Email cannot be empty or invalid!");
                }
                this.email = value;
            }
        }

        public List<Payments> Payments
        {
            get
            {
                return this.payments;
            }
            set
            {
                if (value == null)
                {
                    throw new ArgumentNullException("There are no any payments entered!");
                }
                this.payments = value;
            }
        }

        public CustomerType CustomerType
        {
            get
            {
                return this.customerType;
            }
            set
            {
                this.customerType = value;
            }
        }

        public override bool Equals(object obj)
        {
            Customer customer = obj as Customer;

            if (customer == null)
            {
                return false;
            }

            if (!(this.FirstName == customer.FirstName))
            {
                return false;
            }

            if (!(this.MiddleName == customer.MiddleName))
            {
                return false;
            }

            if (!(this.LastName == customer.LastName))
            {
                return false;
            }

            if (!(this.ID == customer.ID))
            {
                return false;
            }

            if (!(this.PermanentAddress == customer.PermanentAddress))
            {
                return false;
            }

            if (!(this.MobilePhone == customer.MobilePhone))
            {
                return false;
            }

            if (!(this.Email == customer.Email))
            {
                return false;
            }

            if (!(object.Equals(this.Payments, customer.Payments)))
            {
                return false;
            }

            if (!(this.CustomerType == customer.CustomerType))
            {
                return false;
            }

            return true;
        }

        public static bool operator ==(Customer customerOne, Customer customerTwo)
        {
            return Customer.Equals(customerOne, customerTwo);
        }

        public static bool operator !=(Customer customerOne, Customer customerTwo)
        {
            return !Customer.Equals(customerOne, customerTwo);
        }

        public override int GetHashCode()
        {
            return FirstName.GetHashCode() ^ MiddleName.GetHashCode() ^ LastName.GetHashCode() ^ ID.GetHashCode() ^
                PermanentAddress.GetHashCode() ^ MobilePhone.GetHashCode() ^ Payments.GetHashCode() ^ CustomerType.GetHashCode();
        }

        public object Clone()
        {
            Customer customer = new Customer(this.FirstName, this.MiddleName, this.LastName, this.ID, this.PermanentAddress, this.MobilePhone,
            this.Email, this.Payments, this.CustomerType);

            customer.FirstName = (string)this.FirstName.Clone();
            customer.MiddleName = (string)this.MiddleName.Clone();
            customer.LastName = (string)this.LastName.Clone();
            customer.ID = (string)this.ID.Clone();
            customer.PermanentAddress = (string)this.PermanentAddress.Clone();
            customer.MobilePhone = (string)this.MobilePhone.Clone();
            customer.Email = (string)this.Email.Clone();
            customer.CustomerType = this.CustomerType;
            customer.Payments = new List<Payments>();

            foreach (var payment in this.Payments)
            {
                customer.Payments.Add((Payments)payment.Clone());
            }

            return customer;
        }

        public int CompareTo(Customer otherCustomer)
        {
            int sortResult = this.FirstName.CompareTo(otherCustomer.FirstName);

            if (sortResult == 0)
            {
                sortResult = this.MiddleName.CompareTo(otherCustomer.MiddleName);

                if (sortResult == 0)
                {
                    sortResult = this.LastName.CompareTo(otherCustomer.LastName);

                    if (sortResult == 0)
                    {
                        sortResult = this.ID.CompareTo(otherCustomer.ID);
                    }
                }
            }

            return sortResult;
        }

        public override string ToString()
        {
            string customerNames = String.Format("Customer's information - \nFirst name: {0}\nMiddle name: {1}\nLast name: {2}\n",
                this.firstName, this.middleName, this.lastName);

            string customerPersonalInformation = String.Format("Customer's personal info - ID: {0}\nPermanent Address: {1}\nMobilePhone: {2}\nEmail: {3}\n",
                this.id, this.permanentAddress, this.mobilePhone, this.email);

            string customerBusinessData = "Customer's business data - \n";

            foreach (var payment in this.Payments)
            {
                customerBusinessData += payment.ToString();
            }
            customerBusinessData += String.Format("Type of Client: {0}", this.customerType);

            return customerNames + customerPersonalInformation + customerBusinessData;
        }      
    }
}