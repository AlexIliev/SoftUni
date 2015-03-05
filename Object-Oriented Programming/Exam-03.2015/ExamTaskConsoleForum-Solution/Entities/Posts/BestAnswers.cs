using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConsoleForum.Contracts;

namespace ConsoleForum.Entities.Posts
{
    class BestAnswers : Answer
    {
        public BestAnswers(int id, string body, IUser author)
            : base(id, body, author)
        {
        }

        public override string ToString()
        {
            StringBuilder outBestAnswers = new StringBuilder();

            outBestAnswers.AppendFormat("{0}", new string('*', 20)).AppendLine();
            outBestAnswers.AppendFormat("[ Answer ID: {0} ]", base.Id).AppendLine();
            outBestAnswers.AppendFormat("Posted by: {0}", this.Author.Username).AppendLine();
            outBestAnswers.AppendFormat("Answer Body: {0}", base.Body).AppendLine();
            outBestAnswers.AppendFormat("{0}", new string('-', 20)).AppendLine();
            outBestAnswers.AppendFormat("{0}", new string('*', 20)).AppendLine();

            return outBestAnswers.ToString();
        }
    }
}
