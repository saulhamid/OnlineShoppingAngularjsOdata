using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.ModelBinding;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.OData.Routing;
using OnlineShopProject.Models;

namespace OnlineShopProject.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.OData.Builder;
    using System.Web.OData.Extensions;
    using OnlineShopProject.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<PaymantDetail>("PaymantDetails");
    config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class PaymantDetailsController : ODataController
    {
        private OnlineShopProjectContext db = new OnlineShopProjectContext();

        // GET: odata/PaymantDetails
        [EnableQuery]
        public IQueryable<PaymantDetail> GetPaymantDetails()
        {
            return db.PaymantDetails;
        }

        // GET: odata/PaymantDetails(5)
        [EnableQuery]
        public SingleResult<PaymantDetail> GetPaymantDetail([FromODataUri] int key)
        {
            return SingleResult.Create(db.PaymantDetails.Where(paymantDetail => paymantDetail.PaymantDetailsID == key));
        }

        // PUT: odata/PaymantDetails(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<PaymantDetail> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PaymantDetail paymantDetail = await db.PaymantDetails.FindAsync(key);
            if (paymantDetail == null)
            {
                return NotFound();
            }

            patch.Put(paymantDetail);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymantDetailExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(paymantDetail);
        }

        // POST: odata/PaymantDetails
        public async Task<IHttpActionResult> Post(PaymantDetail paymantDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PaymantDetails.Add(paymantDetail);
            await db.SaveChangesAsync();

            return Created(paymantDetail);
        }

        // PATCH: odata/PaymantDetails(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<PaymantDetail> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PaymantDetail paymantDetail = await db.PaymantDetails.FindAsync(key);
            if (paymantDetail == null)
            {
                return NotFound();
            }

            patch.Patch(paymantDetail);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymantDetailExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(paymantDetail);
        }

        // DELETE: odata/PaymantDetails(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            PaymantDetail paymantDetail = await db.PaymantDetails.FindAsync(key);
            if (paymantDetail == null)
            {
                return NotFound();
            }

            db.PaymantDetails.Remove(paymantDetail);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PaymantDetailExists(int key)
        {
            return db.PaymantDetails.Count(e => e.PaymantDetailsID == key) > 0;
        }
    }
}
