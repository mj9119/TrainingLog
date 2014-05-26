using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        Page.Form.DefaultFocus = Login1.FindControl("Username").ClientID;

    
// The Code below actually exists in Prod as a security certificate is invoked on Godaddy
        // if secure connection, set initial cursor position in the User Name field 
        // if not secure connection, then Redirect to secure connection
/*
        if (Request.IsSecureConnection)
        {
            lblTemp.Text = "Secure https connection";
            Page.Form.DefaultFocus = Login1.FindControl("Username").ClientID;
        }
        else
        {
            string url = Request.Url.ToString().Replace("http:", "https:");
            Response.Redirect(url);
            lblTemp.Text = "Not Secure http connection";
        } 
*/
    }

}