<%@ Page Title="test123" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="HomePage.aspx.cs" Inherits="HomePage" %>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">

    <div class="clear hideSkiplink" >
        <asp:Menu ID="NavigationMenu" style="margin:0cm 0cm 0cm 0.3cm" CssClass="menu" runat="server"  EnableViewState="false" IncludeStyleBlock="false" Orientation="Horizontal" Font-Size="XX-Large">
            <Items>
                <%--<asp:MenuItem NavigateUrl="#" Text=""/>--%>
                <asp:MenuItem NavigateUrl="~/HomePage.aspx" Text="Home"/>                    
                <asp:MenuItem NavigateUrl="~/Training_Code/TrainingReport.aspx" Text="1. Triathlon Training Log"/>
                <asp:MenuItem NavigateUrl="http://www.pettigoats.com" target="_blank" Text="2. Pettigoat Acres Farm" />                
                <asp:MenuItem NavigateUrl="http://www.orioncalls.com" target="_blank" Text="3. Orion Game Calls"/>
                <asp:MenuItem NavigateUrl="http://joeboman.com/Default.aspx" target="_blank" Text="4. Murray Casings"/>
                <asp:MenuItem NavigateUrl="http://www.ixtapaofshawnee.com/" target="_blank" Text="5. Ixtapa Restaurant"/>
                <asp:MenuItem NavigateUrl="http://joeboman.com/FiveKPace.htm" target="_blank" Text="6. 5K Pace JS Calculator"/>
                <%--<asp:MenuItem NavigateUrl="#" Text="&nbsp"/>--%>
            </Items>
        </asp:Menu>
    </div>

</asp:Content>

<asp:Content ID="BodyContent" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <p style="margin:0;text-align: center;font-size: x-large;">
         Welcome to the Home page <br />
         ASP.NET source code links for first two items below
    </p>

    <div id="menu1">
        <asp:Menu  runat="server"   EnableViewState="false" IncludeStyleBlock="false" Orientation="Vertical" RenderingMode="List" Font-Size="X-Large">
            <Items>                                 
                <asp:MenuItem NavigateUrl="https://github.com/mj9119/TrainingLog" target="_blank" Text="1. Triathlon Training Log source code link to GitHub - C# ASP.NET Webforms framework application.  Includes the following technologies: HTML, CSS, SQL, ADO.NET, jQuery, MSSQL Server database created using T-SQL script  "/>
                <asp:MenuItem NavigateUrl="https://github.com/mj9119/Pettigoats" target="_blank" Text="2. Pettigoat Acres Farm source code link to GitHub - C# ASP.NET MVC4 dynamic application.  Includes MSSQL, Entity Frameworks, HTML helpers, Razor Markup Language, Content Mgmt interface"/>
                <asp:MenuItem NavigateUrl="http://www.orioncalls.com" target="_blank" Text="3. Orion Game Calls source code is available upon request - Recently redesigned ecommerce Paypal website.  Writes dynamic HTML & Javascript using PHP based upon user selection.  Stores/Updates/Retrieves site content from MySQL database and the Linux file system.  Provides Content Management to user via PHP/TinyMCE interface"/>
                <asp:MenuItem NavigateUrl="http://joeboman.com/Default.aspx" target="_blank" Text="4. Murray Casings - Converting current static site to ASP.Net Webforms with Content Management solution.  Currently defining site requirements with business owner.  Targeted deployment: November 15, 2016"/> 
                <asp:MenuItem NavigateUrl="http://www.ixtapaofshawnee.com/" target="_blank" Text="5. Ixtapa Restaurant - Static PHP restaurant site - Restaurant out of business 2016"/>
                <asp:MenuItem NavigateUrl="http://joeboman.com/FiveKPace.htm" target="_blank" Text="6. JavaScript 5k Pace calculator"/>
            </Items>
        </asp:Menu>
    </div>

</asp:Content>

