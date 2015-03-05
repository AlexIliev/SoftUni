namespace ConsoleForum.Entities.Posts
{
    using System;
    using System.Text;
    using ConsoleForum.Contracts;

    class Answer : Post, IAnswer
    {
        public Answer(int id, string body, IUser author)
            : base(id, body, author)
        {
        }

        public override string ToString()
        {
            StringBuilder outAnswers = new StringBuilder();
            
            outAnswers.AppendFormat("[ Answer ID: {0} ]", base.Id).AppendLine();
            outAnswers.AppendFormat("Posted by: {0}", this.Author.Username).AppendLine();
            outAnswers.AppendFormat("Answer Body: {0}", base.Body).AppendLine();
            outAnswers.AppendFormat("{0}", new string('-', 20));

            return outAnswers.ToString();
        }
    }
}
