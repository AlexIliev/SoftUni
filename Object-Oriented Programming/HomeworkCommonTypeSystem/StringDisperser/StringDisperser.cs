namespace StringDisperser
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Text;
    using System.Text.RegularExpressions;

    public class StringDisperser : ICloneable, IComparable<StringDisperser>, IEnumerable
    {
        private StringBuilder stringText = new StringBuilder();

        public StringDisperser(params string[] stringText)
        {
            foreach (var text in stringText)
            {
                this.StringText.Append(text);
            }
        }

        public StringBuilder StringText
        {
            get
            {
                return this.stringText;
            }
            set
            {
                if (value == null)
                {
                    throw new ArgumentNullException("There is no strings entered!");
                }
                this.stringText = value;
            }
        }        

        public override bool Equals(object obj)
        {
            StringDisperser otherStringObject = obj as StringDisperser;

            if (otherStringObject == null)
            {
                return false;
            }

            if (!(this.StringText.ToString().CompareTo(otherStringObject.StringText.ToString()) == 0))
            {
                return false;
            }          

            return true;
        }

        public static bool operator ==(StringDisperser stringObjectOne, StringDisperser stringObjectTwo)
        {
            return StringDisperser.Equals(stringObjectOne, stringObjectTwo);
        }

        public static bool operator !=(StringDisperser stringObjectOne, StringDisperser stringObjectTwo)
        {
            return !StringDisperser.Equals(stringObjectOne, stringObjectTwo);
        }

        public override int GetHashCode()
        {
            return StringText.GetHashCode();
        }

        public object Clone()
        {
            StringDisperser stringObject = new StringDisperser(this.StringText.ToString());

            return stringObject;
        }

        public int CompareTo(StringDisperser otherStringObject)
        {
            int sortResult = this.StringText.ToString().CompareTo(otherStringObject.StringText.ToString());

            return sortResult;
        }

        public override string ToString()
        {
            return this.StringText.ToString();
        }

        public IEnumerator GetEnumerator()
        {
            for (int i = 0; i < this.StringText.Length; i++)
            {
                yield return this.StringText[i];
            }
        }
    }
}