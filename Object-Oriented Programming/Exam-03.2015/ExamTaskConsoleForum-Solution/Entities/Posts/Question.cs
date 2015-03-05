using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConsoleForum.Contracts;

namespace ConsoleForum.Entities.Posts
{
    class Question : Post, IQuestion
    {
        private string title;
        private IList<IAnswer> answers = new List<IAnswer>();

        public Question(int id, string body, IUser author, string title)
            : base(id, body, author)
        {
            this.Title = title;
        }

        public string Title
        {
            get
            {
                return this.title;
            }
            set
            {
                this.title = value;
            }
        }

        public IList<IAnswer> Answers
        {
            get
            {
                return this.answers;
            }
            set
            {
                this.answers = value;
            }
        }

        public override string ToString()
        {
            StringBuilder outQuestion = new StringBuilder();

            outQuestion.AppendFormat("[ Question ID: {0} ]", base.Id).AppendLine();
            outQuestion.AppendFormat("Posted by: {0}", base.Author.Username).AppendLine();
            outQuestion.AppendFormat("Question Title: {0}", this.Title).AppendLine();
            outQuestion.AppendFormat("Question Body: {0}", base.Body).AppendLine();
            outQuestion.AppendFormat("{0}", new string('=', 20)).AppendLine();
            outQuestion.AppendFormat("{0}", this.Answers.Any() ? PrintAnswers(this.Answers) : "No answers");

            return outQuestion.ToString();
        }

        private string PrintAnswers(IList<IAnswer> answers)
        {
            StringBuilder outAnswers = new StringBuilder();

            IAnswer bestAnswer = answers.FirstOrDefault(a => a.GetType() == typeof(BestAnswers));

            outAnswers.AppendLine("Answers:");
            string outAnswersAsString = "";

            if (bestAnswer == null )
            {
                outAnswersAsString += string.Join(
                    Environment.NewLine,
                    this.Answers.Select(a => a.ToString()));
            }
            else
            {
                outAnswers.Append(bestAnswer);
                var answersList = this.Answers
                    .Where(a => a.Id != bestAnswer.Id)
                    .OrderBy(a => a.Id);
                outAnswersAsString += string.Join(
                    Environment.NewLine,
                    answersList.Select(a => a.ToString()));
            }
                
            outAnswers.Append(outAnswersAsString);
            return outAnswers.ToString();
        }
    }
}
