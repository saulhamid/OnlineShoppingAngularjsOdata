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
    builder.EntitySet<ProductCategory>("ProductCategories");
    config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ProductCategoriesController : ODataController
    {
        private OnlineShopProjectContext db = new OnlineShopProjectContext();

        // GET: odata/ProductCategories
        [EnableQuery]
        public IQueryable<ProductCategory> GetProductCategories()
        {
            return db.ProductCategories;
        }

        // GET: odata/ProductCategories(5)
        [EnableQuery]
        public SingleResult<ProductCategory> GetProductCategory([FromODataUri] int key)
        {
            return SingleResult.Create(db.ProductCategories.Where(productCategory => productCategory.CategoryID == key));
        }

        // PUT: odata/ProductCategories(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<ProductCategory> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProductCategory productCategory = await db.ProductCategories.FindAsync(key);
            if (productCategory == null)
            {
                return NotFound();
            }

            patch.Put(productCategory);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductCategoryExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(productCategory);
        }

        // POST: odata/ProductCategories
        public async Task<IHttpActionResult> Post(ProductCategory productCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductCategories.Add(productCategory);
            await db.SaveChangesAsync();

            return Created(productCategory);
        }

        // PATCH: odata/ProductCategories(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<ProductCategory> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProductCategory productCategory = await db.ProductCategories.FindAsync(key);
            if (productCategory == null)
            {
                return NotFound();
            }

            patch.Patch(productCategory);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductCategoryExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(productCategory);
        }

        // DELETE: odata/ProductCategories(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            ProductCategory productCategory = await db.ProductCategories.FindAsync(key);
            if (productCategory == null)
            {
                return NotFound();
            }

            db.ProductCategories.Remove(productCategory);
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

        private bool ProductCategoryExists(int key)
        {
            return db.ProductCategories.Count(e => e.CategoryID == key) > 0;
        }
    }
}
