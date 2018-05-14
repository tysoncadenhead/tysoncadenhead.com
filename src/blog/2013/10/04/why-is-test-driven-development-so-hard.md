Test driven development (or TDD for short) is the practice of writing your unit tests prior to writing the code for your application. Already having your tests in place informs your software design decisions and serves as a way to determine whether your code is accomplishing what it is supposed to. The benefits of TDD are obvious, so why is it so hard to approach writing software this way?

<!-- more -->

###Non Test Driven Process

As a way of visualizing the process, the non test driven process will typically look something like this:

![](/images/blog/tdd1.png)

Basically, you end up repeating several steps in the process because you start out by writing the code, then you give it a visual check. If you are writing JavaScript in a browser, this might involve looking at the UI, if you are writing server-side code, this might involve looking at the results that your API is returning. Once you are satisfied that everything looks good, you turn around and tack on some tests to make sure nobody breaks your code in the future. You verify the results of your tests and make sure they align with your code and then you may end up either going back to tweak your code or your tests to make the results match up.

###Test Driven Process

The test driven process will look more like this:

![](/images/blog/tdd2.png)

It's obvious that this is a much more streamlined approach. You start out by writing the tests, then you write your code to fulfill the requirements of the tests. Finally, you verify that the results of the tests are correctly returned by your code. If your test suite is comprehensive enough, everything should be taken care of.

###If TDD is so much better, why is it so hard?

Knowing that TDD is better is one thing, but actually writing your code that way is a totally different story. I think the major thing that has personally held me back from approaching all of my code this way is a series of bad habits. When I was taught how to write code, tests weren't even an afterthought, in fact I don't remember them ever even being mentioned. After a few years of writing code, I began to see that I needed tests in place to keep my code from breaking every time I maintained it, so I appended tests to the end of my process. It was only natural because I had survived so long without writing tests that they seemed like a non-essential bonus.

A few other factors may weigh in on the problem as well:

- Sometimes code is rushed out the door. I have often been in a place where I felt like I didn't have time to write unit tests. I promised myself I would return to them later. One could argue that I didn't have time *not* to write tests.

- I have sometimes felt like I didn't know what to write my tests around until my code was in place. This is usually a result of either poor architecture or unclear requirements.

- Selling TDD to managers and other developers on your team can also be a challenge at times. If you are working for someone who understands the development process, it shouldn't be too difficult to explain to them why a 20% time investment now could save you 50% of your time later, not to mention the benefit of keeping bugs out of your production code, but it can be an issue if your company tends to be shortsighted.

When it comes down to it, most of this is just an issue of education. When we teach newer developers how to write code, unit tests should be at the core of their learning. Since most of the problem is an issue of habit, if we train the correct habits into new coders early on before their habits are established, we are setting them up to be rock stars.

In the same way, we need to train the non-developers we work with, such as management, clients and project managers about the importance of covering everything with tests. If they get why it is important, they will be more willing to see us invest time on the front-end to keep our products working better.

Most importantly, we need to re-educate ourselves. This isn't necessarily just about mentally understanding why TDD is so important, but about retraining ourselves to habitually write tests first. The experts say that it takes 30 days to develop a new habit, so why don't we get started today? Maybe by this time next month, you won't even have to think about it anymore.