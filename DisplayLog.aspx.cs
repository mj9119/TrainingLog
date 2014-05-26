using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class DisplayLog : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        DateTime saveNow = DateTime.Now;
        string myString = saveNow.ToString("MM/dd/yyyy");
        txtEndDate.Text = myString;

        //string weekAgo = saveNow.AddDays(-7).ToString();
        string weekAgo = saveNow.AddDays(-7).ToString("MM/dd/yyyy");
        txtStartDate.Text = weekAgo;

        clnStartDate.Visible = false;
        clnEndDate.Visible = false;
    }
    protected void btnEnterData_Click(object sender, EventArgs e)
    {
        Response.Redirect("EnterLog.aspx");
        
    }
}