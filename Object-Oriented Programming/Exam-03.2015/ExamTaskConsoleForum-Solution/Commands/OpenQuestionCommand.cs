namespace ConsoleForum.Commands
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using ConsoleForum.Entities.Users;
    using ConsoleForum.Contracts;
    using ConsoleForum.Utility;

    public class OpenQuestionCommand : AbstractCommand
    {
        public OpenQuestionCommand(IForum forum)
            : base(forum)
        {
        }

        public override void Execute()
        {
            var users = this.Forum.Users;
            var questions = this.Forum.Questions;
            int id = int.Parse(this.Data[1]);

            var isIdvalid = questions.FirstOrDefault(q => q.Id == id);

            if (isIdvalid == null)
            {
                throw new CommandException(Messages.NoQuestion);
            }

            var currentQuestion = from element in questions
                                  where element.Id == id
                                  select element;

            this.Forum.CurrentQuestion = currentQuestion.FirstOrDefault();

            var sortedQuestions = from question in questions
                                  orderby question.Id
                                  select question;

            this.Forum.Output.AppendLine(this.Forum.CurrentQuestion.ToString());
        }
    }
}